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
                apiResult.setMessage("Mã danh mục đã tồn tại");

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
        // Có danh mục cha
        if (!StringUtils.isNullOrEmpty(category.getParentCode())) {
            Category categoryParent = repository.findFirstByCode(category.getParentCode()).orElse(null);

            if (categoryParent == null) {
                apiResult.setError(true);
                apiResult.setCode("CATEGORY_PARENT_EXISTED");
                apiResult.setMessage("Danh mục cha không tồn tại!");

                return true;
            }

            Set<String> ancestorsCodes = categoryParent.getAncestorsCodes();
            ancestorsCodes.add(categoryParent.getCode());

            category.setLevel(categoryParent.getLevel() + 1);
            category.setCodePath(categoryParent.getCodePath() + "." + category.getCode());
            category.setAncestorsCodes(ancestorsCodes);
        } else {
            // Không có danh mục cha
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

        // Kiểm tra tồn tại
        Category modelDb = repository.findFirstByCode(info.getCode()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (repository.existsByCodeAndAncestorsCodesIn(info.getParentCode(), info.getCode())) {
            apiResult.setError(true);
            apiResult.setCode("ERROR_PARENT");
            apiResult.setMessage("Không thể làm con của con mình");

            return apiResult;
        }

        String oldParentCode = modelDb.getParentCode() != null ? modelDb.getParentCode() : "";
        int oldLevel = modelDb.getLevel();
        modelDb.setModes(new HashSet<>());

        mapper().map(info, modelDb);
        convertData(modelDb);

        // Có sự thay đổi danh mục cha
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
        // Có sự thay đổi danh mục cha
        if (!StringUtils.isNullOrEmpty(category.getParentCode())) {
            Category categoryParent = repository.findFirstByCode(category.getParentCode()).orElse(null);

            if (categoryParent == null) {
                apiResult.setError(true);
                apiResult.setCode("CATEGORY_PARENT_EXISTED");
                apiResult.setMessage("Danh mục cha không tồn tại!");

                return true;
            }

            Set<String> ancestorsCodes = categoryParent.getAncestorsCodes();
            ancestorsCodes.add(categoryParent.getCode());

            category.setLevel(categoryParent.getLevel() + 1);
            category.setCodePath(categoryParent.getCodePath() + "." + category.getCode());
            category.setAncestorsCodes(ancestorsCodes);
        } else {
            // Danh mục trở thành gốc
            category.setLevel(0);
            category.setParentCode(null);
            category.setCodePath(category.getCode());
            category.setAncestorsCodes(new HashSet<>());
        }

        return false;
    }

    /**
     * Cập nhật lại level, tổ tiên các con
     */
    private void updateCategoryChildless(Category modelDb, int oldLevel) {
        // Cập nhật đường dẫn cho các danh mục con
        List<Category> childless = repository.findAllByAncestorsCodesIn(modelDb.getCode());

        for (Category child : childless) {
            // Cập nhật lại level
            child.setLevel(child.getLevel() - oldLevel + modelDb.getLevel());

            // cập nhật lại tổ tiên
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

            // Cập nhật lại path
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

        // Kiểm tra tồn tại
        Category modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        // Vẫn còn danh mục con
        if (modelDb.getChildrenNo() > 0) {
            apiResult.setError(true);
            apiResult.setCode("DEPARTMENT_HAS_CHILD");
            apiResult.setMessage("Không thể xoá, vẫn có danh mục phụ thuộc vào danh mục này!");

            return apiResult;
        }

        // Vẫn có sản phẩm thuộc danh mục này
        if (productRepository.countByCategoryCode(modelDb.getCode()) > 0) {
            apiResult.setError(true);
            apiResult.setCode("DEPARTMENT_HAS_PRODUCT");
            apiResult.setMessage("Không thể xoá, vẫn có sản phẩm nằm trong danh mục này!");

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
        // Kiểm tra tồn tại
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
     * @return Không tìm thấy Object
     */
    private ApiResult<CategoryViewDto> notExists() {
        ApiResult<CategoryViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
