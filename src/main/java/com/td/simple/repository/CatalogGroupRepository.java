package com.td.simple.repository;

import com.td.simple.model.catalog.CatalogGroup;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogGroupRepository extends BaseRepository<CatalogGroup, String>, CatalogGroupRepositoryCustom {

    boolean existsByCode(String code);

    Optional<CatalogGroup> findFirstByCode(String code);

    List<CatalogGroup> findAllByCodeIn(Collection<String> codes);

    List<CatalogGroup> findAllBySystem(boolean system);
}
