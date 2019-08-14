package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.domain.Set;
import com.hollowleg.weighttracker.repository.SetRepository;
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
 * REST controller for managing {@link com.hollowleg.weighttracker.domain.Set}.
 */
@RestController
@RequestMapping("/api")
public class SetResource {

    private final Logger log = LoggerFactory.getLogger(SetResource.class);

    private static final String ENTITY_NAME = "set";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SetRepository setRepository;

    public SetResource(SetRepository setRepository) {
        this.setRepository = setRepository;
    }

    /**
     * {@code POST  /sets} : Create a new set.
     *
     * @param set the set to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new set, or with status {@code 400 (Bad Request)} if the set has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sets")
    public ResponseEntity<Set> createSet(@RequestBody Set set) throws URISyntaxException {
        log.debug("REST request to save Set : {}", set);
        if (set.getId() != null) {
            throw new BadRequestAlertException("A new set cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Set result = setRepository.save(set);
        return ResponseEntity.created(new URI("/api/sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sets} : Updates an existing set.
     *
     * @param set the set to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated set,
     * or with status {@code 400 (Bad Request)} if the set is not valid,
     * or with status {@code 500 (Internal Server Error)} if the set couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sets")
    public ResponseEntity<Set> updateSet(@RequestBody Set set) throws URISyntaxException {
        log.debug("REST request to update Set : {}", set);
        if (set.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Set result = setRepository.save(set);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, set.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sets} : get all the sets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sets in body.
     */
    @GetMapping("/sets")
    public List<Set> getAllSets() {
        log.debug("REST request to get all Sets");
        return setRepository.findAll();
    }

    /**
     * {@code GET  /sets/:id} : get the "id" set.
     *
     * @param id the id of the set to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the set, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sets/{id}")
    public ResponseEntity<Set> getSet(@PathVariable String id) {
        log.debug("REST request to get Set : {}", id);
        Optional<Set> set = setRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(set);
    }

    /**
     * {@code DELETE  /sets/:id} : delete the "id" set.
     *
     * @param id the id of the set to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sets/{id}")
    public ResponseEntity<Void> deleteSet(@PathVariable String id) {
        log.debug("REST request to delete Set : {}", id);
        setRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
