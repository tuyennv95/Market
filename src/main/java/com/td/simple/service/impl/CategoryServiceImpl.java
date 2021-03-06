package com.td.simple.service.impl;

import com.td.simple.model.category.Category;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.category.CategoryViewDto;
import com.td.simple.model_info.category.CategoryAddInfo;
import com.td.simple.model_info.category.CategoryPageableInfo;
import com.td.simple.model_info.category.CategoryUpdateInfo;
import com.td.simple.repository.CategoryRepository;
import com.td.simple.repository.ProductRepository;
import com.td.simple.service.CategoryService;
import com.td.simple.utils.NextSequenceService;
import com.td.simple.utils.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final ProductRepository productRepository;
    private final NextSequenceService nextSequenceService;

    public CategoryServiceImpl(CategoryRepository repository, ProductRepository productRepository, NextSequenceService nextSequenceService) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.nextSequenceService = nextSequenceService;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static CategoryViewDto mapToView(Category category) {
        return mapper().map(category, CategoryViewDto.class);
    }

    public static List<CategoryViewDto> mapToView(List<Category> categories) {
        return categories.stream().map(d -> mapper().map(d, CategoryViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<CategoryViewDto> create(CategoryAddInfo info) {
        ApiResult<CategoryViewDto> apiResult = new ApiResult<>();

        if (StringUtils.isNullOrEmpty(info.getCode())) {
            info.setCode(nextSequenceService.genCodeCommon("category", "C", 4));
        } else {
            info.setCode(info.getCode().toUpperCase());

            if (repository.existsByCode(info.getCode())) {
                apiResult.setError(true);
                apiResult.setCode("CODE_EXISTED");
                apiResult.setMessage("M?? danh m???c ???? t???n t???i");

                return apiResult;
            }
        }

        Category category = mapper().map(info, Category.class);
        convertData(category);

        if (validateCreate(apiResult, category)) {
            return apiResult;
        }

        category.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(category)));

        if (!StringUtils.isNullOrEmpty(category.getParentCode())) {
            repository.updateChild(category.getParentCode(), 1);
        }

        return apiResult;
    }

    private boolean validateCreate(ApiResult<CategoryViewDto> apiResult, Category category) {
        // C?? danh m???c cha
        if (!StringUtils.isNullOrEmpty(category.getParentCode())) {
            Category categoryParent = repository.findFirstByCode(category.getParentCode()).orElse(null);

            if (categoryParent == null) {
                apiResult.setError(true);
                apiResult.setCode("CATEGORY_PARENT_EXISTED");
                apiResult.setMessage("Danh m???c cha kh??ng t???n t???i!");

                return true;
            }

            Set<String> ancestorsCodes = categoryParent.getAncestorsCodes();
            ancestorsCodes.add(categoryParent.getCode());

            category.setLevel(categoryParent.getLevel() + 1);
            category.setCodePath(categoryParent.getCodePath() + "." + category.getCode());
            category.setAncestorsCodes(ancestorsCodes);
        } else {
            // Kh??ng c?? danh m???c cha
            category.setCodePath(category.getCode());
        }

        return false;
    }

    private void convertData(Category category) {
        if (category.getParentCode() == null) {
            category.setParentCode("");
        }

        if (category.getModes() == null) {
            category.setModes(new HashSet<>());
        }
    }

    @Override
    public ApiResult<CategoryViewDto> update(CategoryUpdateInfo info) {
        ApiResult<CategoryViewDto> apiResult = new ApiResult<>();

        // Ki???m tra t???n t???i
        Category modelDb = repository.findFirstByCode(info.getCode()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (repository.existsByCodeAndAncestorsCodesIn(info.getParentCode(), info.getCode())) {
            apiResult.setError(true);
            apiResult.setCode("ERROR_PARENT");
            apiResult.setMessage("Kh??ng th??? l??m con c???a con m??nh");

            return apiResult;
        }

        String oldParentCode = modelDb.getParentCode() != null ? modelDb.getParentCode() : "";
        int oldLevel = modelDb.getLevel();
        modelDb.setModes(new HashSet<>());

        mapper().map(info, modelDb);
        convertData(modelDb);

        // C?? s??? thay ?????i danh m???c cha
        if (!oldParentCode.equals(modelDb.getParentCode()) && validateUpdate(apiResult, modelDb)) {
            return apiResult;
        }

        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        if (!oldParentCode.equals(modelDb.getParentCode())) {
            if (!StringUtils.isNullOrEmpty(oldParentCode)) {
                repository.updateChild(oldParentCode, -1);
            }

            if (!StringUtils.isNullOrEmpty(modelDb.getParentCode())) {
                repository.updateChild(modelDb.getParentCode(), 1);
            }

            updateCategoryChildless(modelDb, oldLevel);
        }

        return apiResult;
    }

    private boolean validateUpdate(ApiResult<CategoryViewDto> apiResult, Category category) {
        // C?? s??? thay ?????i danh m???c cha
        if (!StringUtils.isNullOrEmpty(category.getParentCode())) {
            Category categoryParent = repository.findFirstByCode(category.getParentCode()).orElse(null);

            if (categoryParent == null) {
                apiResult.setError(true);
                apiResult.setCode("CATEGORY_PARENT_EXISTED");
                apiResult.setMessage("Danh m???c cha kh??ng t???n t???i!");

                return true;
            }

            Set<String> ancestorsCodes = categoryParent.getAncestorsCodes();
            ancestorsCodes.add(categoryParent.getCode());

            category.setLevel(categoryParent.getLevel() + 1);
            category.setCodePath(categoryParent.getCodePath() + "." + category.getCode());
            category.setAncestorsCodes(ancestorsCodes);
        } else {
            // Danh m???c tr??? th??nh g???c
            category.setLevel(0);
            category.setParentCode(null);
            category.setCodePath(category.getCode());
            category.setAncestorsCodes(new HashSet<>());
        }

        return false;
    }

    /**
     * C???p nh???t l???i level, t??? ti??n c??c con
     */
    private void updateCategoryChildless(Category modelDb, int oldLevel) {
        // C???p nh???t ???????ng d???n cho c??c danh m???c con
        List<Category> childless = repository.findAllByAncestorsCodesIn(modelDb.getCode());

        for (Category child : childless) {
            // C???p nh???t l???i level
            child.setLevel(child.getLevel() - oldLevel + modelDb.getLevel());

            // c???p nh???t l???i t??? ti??n
            Set<String> ancestorsTemp = modelDb.getAncestorsCodes();
            ancestorsTemp.add(modelDb.getCode());

            Iterator<String> iterator = child.getAncestorsCodes().iterator();
            String str;
            while (iterator.hasNext()) {
                str = iterator.next();
                iterator.remove();

                if (str.equals(modelDb.getCode())) {
                    break;
                }
            }

            ancestorsTemp.addAll(child.getAncestorsCodes());
            child.setAncestorsCodes(ancestorsTemp);

            // C???p nh???t l???i path
            StringBuilder path = new StringBuilder();
            for (String s : child.getAncestorsCodes()) {
                path.append(s).append(".");
            }
            path.append(child.getCode());

            child.setCodePath(path.toString());
        }

        repository.saveAll(childless);
    }

    @Override
    public ApiResult<CategoryViewDto> delete(String code) {
        ApiResult<CategoryViewDto> apiResult = new ApiResult<>();

        // Ki???m tra t???n t???i
        Category modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        // V???n c??n danh m???c con
        if (modelDb.getChildrenNo() > 0) {
            apiResult.setError(true);
            apiResult.setCode("DEPARTMENT_HAS_CHILD");
            apiResult.setMessage("Kh??ng th??? xo??, v???n c?? danh m???c ph??? thu???c v??o danh m???c n??y!");

            return apiResult;
        }

        // V???n c?? s???n ph???m thu???c danh m???c n??y
        if (productRepository.countByCategoryCode(modelDb.getCode()) > 0) {
            apiResult.setError(true);
            apiResult.setCode("DEPARTMENT_HAS_PRODUCT");
            apiResult.setMessage("Kh??ng th??? xo??, v???n c?? s???n ph???m n???m trong danh m???c n??y!");

            return apiResult;
        }

        repository.delete(modelDb);

        if (!StringUtils.isNullOrEmpty(modelDb.getParentCode())) {
            repository.updateChild(modelDb.getParentCode(), -1);
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CategoryViewDto> search(CategoryPageableInfo model) {
        return mapToView(repository.search(model));
    }

    @Override
    public ApiResult<Long> count(CategoryPageableInfo model) {
        return new ApiResult<>(repository.count(model));
    }

    @Override
    public ApiResult<CategoryViewDto> findByCode(String code) {
        // Ki???m tra t???n t???i
        Category modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CategoryViewDto> findByCodes(List<String> codes) {
        return mapToView(repository.findAllByCodeIn(codes));
    }

    /**
     * === Public
     */

    @Override
    public List<CategoryViewDto> getList() {
        return mapToView(repository.findAll()
                .stream()
                .sorted(Comparator.comparing(Category::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    // ===================================

    /**
     * @return Kh??ng t??m th???y Object
     */
    private ApiResult<CategoryViewDto> notExists() {
        ApiResult<CategoryViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("B???n ghi kh??ng t???n t???i");

        return apiResult;
    }
}
