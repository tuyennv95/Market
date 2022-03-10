package com.td.simple.service.impl;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.catalog.Catalog;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogViewDto;
import com.td.simple.model_info.catalog.CatalogAddInfo;
import com.td.simple.model_info.catalog.CatalogPageableInfo;
import com.td.simple.model_info.catalog.CatalogUpdateInfo;
import com.td.simple.repository.CatalogGroupRepository;
import com.td.simple.repository.CatalogRepository;
import com.td.simple.service.CatalogService;
import com.td.simple.utils.NextSequenceService;
import com.td.simple.utils.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository repository;
    private final CatalogGroupRepository catalogGroupRepository;
    private final NextSequenceService nextSequenceService;

    public CatalogServiceImpl(CatalogRepository repository, CatalogGroupRepository catalogGroupRepository, NextSequenceService sequence) {
        this.repository = repository;
        this.catalogGroupRepository = catalogGroupRepository;
        this.nextSequenceService = sequence;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static CatalogViewDto mapToView(Catalog catalog) {
        return mapper().map(catalog, CatalogViewDto.class);
    }

    public static List<CatalogViewDto> mapToView(List<Catalog> catalogs) {
        return catalogs.stream().map(d -> mapper().map(d, CatalogViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatalogViewDto> search(CatalogPageableInfo model) {
        if (StringUtils.isNullOrEmpty(model.getFieldSorted())) {
            model.setFieldSorted("orderNo");
            model.setTypeSorted("DESC");
        }

        return mapToView(repository.search(model));
    }

    @Override
    public ApiResult<Long> count(CatalogPageableInfo model) {
        return new ApiResult<>(repository.count(model));
    }

    @Override
    public ApiResult<CatalogViewDto> create(CatalogAddInfo model, CurrentUser currentUser) {
        ApiResult<CatalogViewDto> apiResult = new ApiResult<>();

        if (StringUtils.isNullOrEmpty(model.getCode())) {
            model.setCode(nextSequenceService.genCodeCommon("catalog", "CL", 4));
        } else {
            model.setCode(model.getCode().toUpperCase());

            if (repository.existsByCode(model.getCode())) {
                apiResult.setError(true);
                apiResult.setCode("CODE_EXISTED");
                apiResult.setMessage("Catalog đã tồn tại");

                return apiResult;
            }
        }

        if (StringUtils.isNullOrEmpty(model.getGroupCode())) {
            apiResult.setError(true);
            apiResult.setCode("GROUP_CODE_EXISTED");
            apiResult.setMessage("Catalog Group không được để trống");

            return apiResult;
        }

        if (!catalogGroupRepository.existsByCode(model.getGroupCode())) {
            apiResult.setError(true);
            apiResult.setCode("GROUP_CODE_EXISTED");
            apiResult.setMessage("Catalog Group tồn tại hoặc đã bị xoá");

            return apiResult;
        }

        Catalog catalog = mapper().map(model, Catalog.class);
        convertData(catalog);

        catalog.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(catalog)));

        if (catalog.isUseDefault()) {
            repository.updateUseDefaultFalse(catalog.getGroupCode());
        }

        return apiResult;
    }

    private void convertData(Catalog catalog) {
        if (catalog.getData() == null) {
            catalog.setData(new HashMap<>());
        }
    }

    @Override
    public ApiResult<CatalogViewDto> update(CatalogUpdateInfo model, CurrentUser currentUser) {
        ApiResult<CatalogViewDto> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        Catalog modelDb = repository.findFirstByCode(model.getCode()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        mapper().map(model, modelDb);
        convertData(modelDb);

        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        if (modelDb.isUseDefault()) {
            repository.updateUseDefaultFalse(modelDb.getGroupCode());
        }

        return apiResult;
    }

    @Override
    public ApiResult<CatalogViewDto> delete(String code, CurrentUser currentUser) {
        ApiResult<CatalogViewDto> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        Catalog modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (modelDb.isSystem()) {
            apiResult.setError(true);
            apiResult.setCode("DELETE_SYSTEM");
            apiResult.setMessage("Không thể xoá dữ liệu mặc định của hệ thông!");

            return apiResult;
        }

        repository.delete(modelDb);

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public ApiResult<CatalogViewDto> findByCode(String code) {
        // Kiểm tra tồn tại
        Catalog modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CatalogViewDto> findByCodeIn(List<String> codes) {
        return mapToView(repository.findAllByCodeIn(codes)
                .stream()
                .sorted(Comparator.comparing(Catalog::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    @Override
    public List<CatalogViewDto> findByGroupCode(String groupCode) {
        return mapToView(repository.findAllByGroupCode(groupCode)
                .stream()
                .sorted(Comparator.comparing(Catalog::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    @Override
    public List<CatalogViewDto> findByGroupCodeIn(List<String> groupCodes) {
        return mapToView(repository.findAllByGroupCodeIn(groupCodes)
                .stream()
                .sorted(Comparator.comparing(Catalog::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<CatalogViewDto> notExists() {
        ApiResult<CatalogViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
