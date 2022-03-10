package com.td.simple.repository;


import com.td.simple.model.catalog.Catalog;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogRepository extends BaseRepository<Catalog, String>, CatalogRepositoryCustom {

    boolean existsByCode(String code);

    Long countByGroupCode(String groupCode);

    Optional<Catalog> findFirstByCode(String code);

    boolean existsByCodeAndGroupCode(String code, String groupCode);

    boolean existsByCodeInAndGroupCode(Collection<String> codes, String groupCode);

    List<Catalog> findAllByCodeIn(Collection<String> codes);

    List<Catalog> findAllByGroupCode(String groupCode);

    List<Catalog> findAllByGroupCodeIn(Collection<String> groupCodes);

    List<Catalog> findAllBySystem(boolean system);
}
