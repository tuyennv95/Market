package com.td.simple.service.impl;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.catalog.CatalogGroup;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogGroupViewDto;
import com.td.simple.model_info.catalog.CatalogGroupAddInfo;
import com.td.simple.model_info.catalog.CatalogGroupPageableInfo;
import com.td.simple.model_info.catalog.CatalogGroupUpdateInfo;
import com.td.simple.repository.CatalogGroupRepository;
import com.td.simple.repository.CatalogRepository;
import com.td.simple.service.CatalogGroupService;
import com.td.simple.utils.NextSequenceService;
import com.td.simple.utils.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogGroupServiceImpl implements CatalogGroupService {

    private final CatalogGroupRepository repository;
    private final CatalogRepository catalogRepository;
    private final NextSequenceService nextSequenceService;

    public CatalogGroupServiceImpl(CatalogGroupRepository repository, CatalogRepository catalogRepository, NextSequenceService sequence) {
        this.repository = repository;
        this.catalogRepository = catalogRepository;
        this.nextSequenceService = sequence;
    }

    public static ModelMapper mapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper;
    }

    public static CatalogGroupViewDto mapToView(CatalogGroup catalogGroup) {
        return mapper().map(catalogGroup, CatalogGroupViewDto.class);
    }

    public static List<CatalogGroupViewDto> mapToView(List<CatalogGroup> catalogGroups) {
        return catalogGroups.stream().map(d -> mapper().map(d, CatalogGroupViewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<CatalogGroupViewDto> search(CatalogGroupPageableInfo model) {
        if (StringUtils.isNullOrEmpty(model.getFieldSorted())) {
            model.setFieldSorted("orderNo");
            model.setTypeSorted("DESC");
        }

        return mapToView(repository.search(model));
    }

    @Override
    public ApiResult<Long> count(CatalogGroupPageableInfo model) {
        return new ApiResult<>(repository.count(model));
    }

    @Override
    public ApiResult<CatalogGroupViewDto> create(CatalogGroupAddInfo model, CurrentUser currentUser) {
        ApiResult<CatalogGroupViewDto> apiResult = new ApiResult<>();

        if (StringUtils.isNullOrEmpty(model.getCode())) {
            model.setCode(nextSequenceService.genCodeCommon("catalog-group", "CG", 4));
        } else {
            model.setCode(model.getCode().toUpperCase());

            if (repository.existsByCode(model.getCode())) {
                apiResult.setError(true);
                apiResult.setCode("CODE_EXISTED");
                apiResult.setMessage("Catalog group đã tồn tại");

                return apiResult;
            }
        }

        CatalogGroup catalogGroup = mapper().map(model, CatalogGroup.class);
        convertData(catalogGroup);

        catalogGroup.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(catalogGroup)));

        return apiResult;
    }

    private void convertData(CatalogGroup catalogGroup) {
        if (catalogGroup.getData() == null) {
            catalogGroup.setData(new HashMap<>());
        }

        if (catalogGroup.getAttributes() == null) {
            catalogGroup.setAttributes(new ArrayList<>());
        }
    }

    @Override
    public ApiResult<CatalogGroupViewDto> update(CatalogGroupUpdateInfo model, CurrentUser currentUser) {
        ApiResult<CatalogGroupViewDto> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        CatalogGroup modelDb = repository.findFirstByCode(model.getCode()).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        modelDb.setAttributes(new ArrayList<>());

        mapper().map(model, modelDb);
        convertData(modelDb);

        modelDb.makeTextSearch();

        apiResult.setResult(mapToView(repository.save(modelDb)));

        return apiResult;
    }

    @Override
    public ApiResult<CatalogGroupViewDto> delete(String code, CurrentUser currentUser) {
        ApiResult<CatalogGroupViewDto> apiResult = new ApiResult<>();

        // Kiểm tra tồn tại
        CatalogGroup modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        if (modelDb.isSystem()) {
            apiResult.setError(true);
            apiResult.setCode("DELETE_SYSTEM");
            apiResult.setMessage("Không thể xoá dữ liệu mặc định của hệ thông!");

            return apiResult;
        }

        if (catalogRepository.countByGroupCode(modelDb.getCode()) > 0) {
            apiResult.setError(true);
            apiResult.setCode("CATALOG_NOT_NULL");
            apiResult.setMessage("Vẫn còn catalog phụ thuộc vào group này!");

            return apiResult;
        }

        repository.delete(modelDb);

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public ApiResult<CatalogGroupViewDto> findByCode(String code) {
        // Kiểm tra tồn tại
        CatalogGroup modelDb = repository.findFirstByCode(code).orElse(null);

        if (modelDb == null) {
            return notExists();
        }

        return new ApiResult<>(mapToView(modelDb));
    }

    @Override
    public List<CatalogGroupViewDto> findByCodeIn(List<String> codes) {
        return mapToView(repository.findAllByCodeIn(codes)
                .stream()
                .sorted(Comparator.comparing(CatalogGroup::getOrderNo).reversed())
                .collect(Collectors.toList()));
    }

    // ===================================

    /**
     * @return Không tìm thấy Object
     */
    private ApiResult<CatalogGroupViewDto> notExists() {
        ApiResult<CatalogGroupViewDto> apiResult = new ApiResult<>();

        apiResult.setError(true);
        apiResult.setCode("NOT_EXISTS");
        apiResult.setMessage("Bản ghi không tồn tại");

        return apiResult;
    }
}
