package com.hollowleg.weighttracker.repository;

import com.hollowleg.weighttracker.domain.TrainingSession;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TrainingSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingSessionRepository extends MongoRepository<TrainingSession, String> {

}
