package com.hollowleg.weighttracker.repository;

import com.hollowleg.weighttracker.domain.Exercise;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Exercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {

}
