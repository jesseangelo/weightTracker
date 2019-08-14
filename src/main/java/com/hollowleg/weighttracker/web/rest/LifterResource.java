package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.domain.Lifter;
import com.hollowleg.weighttracker.repository.LifterRepository;
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
 * REST controller for managing {@link com.hollowleg.weighttracker.domain.Lifter}.
 */
@RestController
@RequestMapping("/api")
public class LifterResource {

    private final Logger log = LoggerFactory.getLogger(LifterResource.class);

    private static final String ENTITY_NAME = "lifter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LifterRepository lifterRepository;

    public LifterResource(LifterRepository lifterRepository) {
        this.lifterRepository = lifterRepository;
    }

    /**
     * {@code POST  /lifters} : Create a new lifter.
     *
     * @param lifter the lifter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lifter, or with status {@code 400 (Bad Request)} if the lifter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lifters")
    public ResponseEntity<Lifter> createLifter(@RequestBody Lifter lifter) throws URISyntaxException {
        log.debug("REST request to save Lifter : {}", lifter);
        if (lifter.getId() != null) {
            throw new BadRequestAlertException("A new lifter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lifter result = lifterRepository.save(lifter);
        return ResponseEntity.created(new URI("/api/lifters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lifters} : Updates an existing lifter.
     *
     * @param lifter the lifter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lifter,
     * or with status {@code 400 (Bad Request)} if the lifter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lifter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lifters")
    public ResponseEntity<Lifter> updateLifter(@RequestBody Lifter lifter) throws URISyntaxException {
        log.debug("REST request to update Lifter : {}", lifter);
        if (lifter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lifter result = lifterRepository.save(lifter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, lifter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lifters} : get all the lifters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lifters in body.
     */
    @GetMapping("/lifters")
    public List<Lifter> getAllLifters() {
        log.debug("REST request to get all Lifters");
        return lifterRepository.findAll();
    }

    /**
     * {@code GET  /lifters/:id} : get the "id" lifter.
     *
     * @param id the id of the lifter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lifter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lifters/{id}")
    public ResponseEntity<Lifter> getLifter(@PathVariable String id) {
        log.debug("REST request to get Lifter : {}", id);
        Optional<Lifter> lifter = lifterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lifter);
    }

    /**
     * {@code DELETE  /lifters/:id} : delete the "id" lifter.
     *
     * @param id the id of the lifter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lifters/{id}")
    public ResponseEntity<Void> deleteLifter(@PathVariable String id) {
        log.debug("REST request to delete Lifter : {}", id);
        lifterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
