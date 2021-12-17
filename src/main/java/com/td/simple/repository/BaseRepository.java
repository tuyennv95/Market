package com.td.simple.repository;

import com.td.simple.model.BaseEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface BaseRepository<E extends BaseEntity<T>, T extends Serializable>
        extends MongoRepository<E, T> {
    /**
     * @param id
     * @return
     */
    default boolean contains(T id) {
        return existsById(id);
    }

    /**
     * @param id
     * @return
     */
    @Query("{'id':'?0'}")
    E get(T id);
}
