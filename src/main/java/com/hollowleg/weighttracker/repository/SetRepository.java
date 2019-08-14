package com.hollowleg.weighttracker.repository;

import com.hollowleg.weighttracker.domain.Set;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Set entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SetRepository extends MongoRepository<Set, String> {

}
