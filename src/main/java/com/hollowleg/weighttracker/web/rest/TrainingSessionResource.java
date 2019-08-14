package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.domain.TrainingSession;
import com.hollowleg.weighttracker.repository.TrainingSessionRepository;
import com.hollowleg.weighttracker.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.hollowleg.weighttracker.domain.TrainingSession}.
 */
@RestController
@RequestMapping("/api")
public class TrainingSessionResource {

    private final Logger log = LoggerFactory.getLogger(TrainingSessionResource.class);

    private static final String ENTITY_NAME = "trainingSession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrainingSessionRepository trainingSessionRepository;

    public TrainingSessionResource(TrainingSessionRepository trainingSessionRepository) {
        this.trainingSessionRepository = trainingSessionRepository;
    }

    /**
     * {@code POST  /training-sessions} : Create a new trainingSession.
     *
     * @param trainingSession the trainingSession to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trainingSession, or with status {@code 400 (Bad Request)} if the trainingSession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/training-sessions")
    public ResponseEntity<TrainingSession> createTrainingSession(@RequestBody TrainingSession trainingSession) throws URISyntaxException {
        log.debug("REST request to save TrainingSession : {}", trainingSession);
        if (trainingSession.getId() != null) {
            throw new BadRequestAlertException("A new trainingSession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrainingSession result = trainingSessionRepository.save(trainingSession);
        return ResponseEntity.created(new URI("/api/training-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /training-sessions} : Updates an existing trainingSession.
     *
     * @param trainingSession the trainingSession to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trainingSession,
     * or with status {@code 400 (Bad Request)} if the trainingSession is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trainingSession couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/training-sessions")
    public ResponseEntity<TrainingSession> updateTrainingSession(@RequestBody TrainingSession trainingSession) throws URISyntaxException {
        log.debug("REST request to update TrainingSession : {}", trainingSession);
        if (trainingSession.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrainingSession result = trainingSessionRepository.save(trainingSession);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, trainingSession.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /training-sessions} : get all the trainingSessions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trainingSessions in body.
     */
    @GetMapping("/training-sessions")
    public List<TrainingSession> getAllTrainingSessions() {
        log.debug("REST request to get all TrainingSessions");
        return trainingSessionRepository.findAll();
    }

    /**
     * {@code GET  /training-sessions/:id} : get the "id" trainingSession.
     *
     * @param id the id of the trainingSession to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trainingSession, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/training-sessions/{id}")
    public ResponseEntity<TrainingSession> getTrainingSession(@PathVariable String id) {
        log.debug("REST request to get TrainingSession : {}", id);
        Optional<TrainingSession> trainingSession = trainingSessionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trainingSession);
    }

    /**
     * {@code DELETE  /training-sessions/:id} : delete the "id" trainingSession.
     *
     * @param id the id of the trainingSession to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/training-sessions/{id}")
    public ResponseEntity<Void> deleteTrainingSession(@PathVariable String id) {
        log.debug("REST request to delete TrainingSession : {}", id);
        trainingSessionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
