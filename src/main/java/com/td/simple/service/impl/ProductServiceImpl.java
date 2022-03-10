package com.td.simple.service.impl;

import com.google.common.base.Strings;
import com.td.simple.constants.Common;
import com.td.simple.model.category.Category;
import com.td.simple.model.product.PriceCustom;
import com.td.simple.model.product.Product;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.product.ProductSuggestionViewDto;
import com.td.simple.model_dto.product.ProductViewDto;
import com.td.simple.model_info.product.ProductAddInfo;
import com.td.simple.model_info.product.ProductUpdateInfo;
import com.td.simple.model_info.product.ProductPageableInfo;
import com.td.simple.repository.CatalogRepository;
import com.td.simple.repository.CategoryRepository;
import com.td.simple.repository.ProductRepository;
import com.td.simple.service.ProductService;
import com.td.simple.utils.NextSequenceService;
import com.td.simple.utils.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final CatalogRepository catalogRepository;
    private final NextSequenceService nextSequenceService;

    public ProductServiceImpl(ProductRepository repository, CategoryRepository categoryRepository, CatalogRepository catalogRepository, NextSequenceService nextSequenceService) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.catalogRepository = catalogRepository;
        this.nextSequenceService = nextSequenceService;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static ProductViewDto mapToView(Product product) {
        return mapper().map(product, ProductViewDto.class);
    }

    public static List<ProductViewDto> mapToView(List<Product> products) {
        return products.stream().map(d -> mapper().map(d, ProductViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResult<ProductViewDto> create(ProductAddInfo info) {
        ApiResult<ProductViewDto> apiResult = new ApiResult<>();

        if (StringUtils.isNullOrEmpty(info.getCode())) {
            info.setCode(nextSequenceService.genCodeCommon("product", "SP", 4));
        } else {
            info.setCode(info.getCode().toUpperCase());

            if (repository.existsByCode(info.getCode())) {
                apiResult.setError(true);
                apiResult.setCode("CODE_EXISTED");
                apiResult.setMessage("Mã danh mục đã tồn tại");

                return apiResult;
            }
        }

        Product product = mapper().map(info, Product.class);

        if (product.getPrice().getPriceCustoms() != null && product.getPrice().getPriceCustoms().size() > 1) {
            List<PriceCustom> customs = product.getPrice().getPriceCustoms()
                    .stream()
                    .sorted(Comparator.comparing(PriceCustom::getQuantity).reversed())
                    .collect(Collectors.toList());

            product.getPrice().setPriceCustoms(customs);
        }

        if (validateData(apiResult, product)) {
            return apiResult;
        }

        product.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(product)));

        return apiResult;
    }

    private boolean validateData(ApiResult<ProductViewDto> apiResult, Product product) {
        if (Strings.isNullOrEmpty(product.getCategoryCode())) {
            apiResult.setError(true);
            apiResult.setCode("CATEGORY_EMPTY");
            apiResult.setMessage("Danh mục không được để trống");

            return true;
        }

        if (!categoryRepository.existsByCode(product.getCategoryCode())) {
            apiResult.setError(true);
            apiResult.setCode("CATEGORY_EXISTS");
            apiResult.setMessage("Danh mục không tồn tại hoặc đã bị xoá");

            return true;
        }

        boolean checkBrand = !Strings.isNullOrEmpty(product.getBrandCode()) && !catalogRepository.existsByCodeAndGroupCode(product.getBrandCode(), Common.BRAND);
        boolean checkTag = !product.getTags().isEmpty() && !catalogRepository.existsByCodeInAndGroupCode(product.getTags(), Common.TAG);

        if (checkBrand || checkTag) {
            apiResult.setError(true);
            apiResult.setCode("CATALOG_EXISTS");
            apiResult.setMessage("Dữ liệu không tồn tại bên catalog!");

            return true;
        }

        return false;
    }

    @Override
    public ApiResult<ProductViewDto> update(ProductUpdateInfo info) {
        ApiResult<ProductViewDto> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        Product modelDb = repository.findFirstByCode(info.getCode()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        mapper().map(info, modelDb);

        if (validateData(apiResult, modelDb)) {
            return apiResult;
        }

        if (modelDb.getPrice().getPriceCustoms() != null && modelDb.getPrice().getPriceCustoms().size() > 1) {
            List<PriceCustom> customs = modelDb.getPrice().getPriceCustoms()
                    .stream()
                    .sorted(Comparator.comparing(PriceCustom::getQuantity).reversed())
                    .collect(Collectors.toList());

            modelDb.getPrice().setPriceCustoms(customs);
        }

        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        return apiResult;
    }

    @Override
    public ApiResult<ProductViewDto> delete(String code) {
        // Kiểm tra tồn tại
        Product modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        repository.delete(modelDb);
        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<ProductViewDto> search(ProductPageableInfo model) {
        if (StringUtils.isNullOrEmpty(model.getFieldSorted())) {
            model.setFieldSorted("orderNo");
            model.setTypeSorted("DESC");
        }

        List<String> categoryCodes = null;
        if (!Strings.isNullOrEmpty(model.getCategoryCode())) {
            List<Category> categories = categoryRepository.findAllByAncestorsCodesIn(model.getCategoryCode().toUpperCase());

            categoryCodes = categories.stream().map(Category::getCode).collect(Collectors.toList());
            categoryCodes.add(model.getCategoryCode().toUpperCase());
        }

        return mapToView(repository.search(model, categoryCodes));
    }

    @Override
    public ApiResult<Long> count(ProductPageableInfo model) {

        List<String> categoryCodes = null;
        if (!Strings.isNullOrEmpty(model.getCategoryCode())) {
            List<Category> categories = categoryRepository.findAllByAncestorsCodesIn(model.getCategoryCode().toUpperCase());

            categoryCodes = categories.stream().map(Category::getCode).collect(Collectors.toList());
            categoryCodes.add(model.getCategoryCode().toUpperCase());
        }

        return new ApiResult<>(repository.count(model, categoryCodes));
    }

    @Override
    public ApiResult<ProductViewDto> findByCode(String code) {
        // Kiểm tra tồn tại
        Product modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<ProductViewDto> findByCodes(List<String> codes) {
        return mapToView(repository.findAllByCodeIn(codes)
                .stream()
                .sorted(Comparator.comparing(Product::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    @Override
    public List<ProductSuggestionViewDto> suggestion(String keyword, String keywordType, int top) {
        List<Product> products = repository.suggestion(keyword, keywordType, top);

        return products.stream().map(product -> mapper().map(product, ProductSuggestionViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductViewDto> topBuy(int page, int top) {
        return mapToView(repository.searchTopBuy(page, top));
    }

    @Override
    public void makeTextSearch() {
        List<Product> products = repository.findAll();

        for (Product product : products) {
            product.makeTextSearch();
        }

        repository.saveAll(products);
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<ProductViewDto> notExists() {
        ApiResult<ProductViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
