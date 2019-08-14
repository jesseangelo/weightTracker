package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.WeightTrackerApp;
import com.hollowleg.weighttracker.domain.Set;
import com.hollowleg.weighttracker.repository.SetRepository;
import com.hollowleg.weighttracker.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.hollowleg.weighttracker.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link SetResource} REST controller.
 */
@SpringBootTest(classes = WeightTrackerApp.class)
public class SetResourceIT {

    private static final Integer DEFAULT_REPS = 1;
    private static final Integer UPDATED_REPS = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    private static final Integer DEFAULT_EXERCISE = 1;
    private static final Integer UPDATED_EXERCISE = 2;

    @Autowired
    private SetRepository setRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSetMockMvc;

    private Set set;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SetResource setResource = new SetResource(setRepository);
        this.restSetMockMvc = MockMvcBuilders.standaloneSetup(setResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Set createEntity() {
        Set set = new Set()
            .reps(DEFAULT_REPS)
            .weight(DEFAULT_WEIGHT)
            .exercise(DEFAULT_EXERCISE);
        return set;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Set createUpdatedEntity() {
        Set set = new Set()
            .reps(UPDATED_REPS)
            .weight(UPDATED_WEIGHT)
            .exercise(UPDATED_EXERCISE);
        return set;
    }

    @BeforeEach
    public void initTest() {
        setRepository.deleteAll();
        set = createEntity();
    }

    @Test
    public void createSet() throws Exception {
        int databaseSizeBeforeCreate = setRepository.findAll().size();

        // Create the Set
        restSetMockMvc.perform(post("/api/sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(set)))
            .andExpect(status().isCreated());

        // Validate the Set in the database
        List<Set> setList = setRepository.findAll();
        assertThat(setList).hasSize(databaseSizeBeforeCreate + 1);
        Set testSet = setList.get(setList.size() - 1);
        assertThat(testSet.getReps()).isEqualTo(DEFAULT_REPS);
        assertThat(testSet.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testSet.getExercise()).isEqualTo(DEFAULT_EXERCISE);
    }

    @Test
    public void createSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = setRepository.findAll().size();

        // Create the Set with an existing ID
        set.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSetMockMvc.perform(post("/api/sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(set)))
            .andExpect(status().isBadRequest());

        // Validate the Set in the database
        List<Set> setList = setRepository.findAll();
        assertThat(setList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllSets() throws Exception {
        // Initialize the database
        setRepository.save(set);

        // Get all the setList
        restSetMockMvc.perform(get("/api/sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(set.getId())))
            .andExpect(jsonPath("$.[*].reps").value(hasItem(DEFAULT_REPS)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].exercise").value(hasItem(DEFAULT_EXERCISE)));
    }
    
    @Test
    public void getSet() throws Exception {
        // Initialize the database
        setRepository.save(set);

        // Get the set
        restSetMockMvc.perform(get("/api/sets/{id}", set.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(set.getId()))
            .andExpect(jsonPath("$.reps").value(DEFAULT_REPS))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.exercise").value(DEFAULT_EXERCISE));
    }

    @Test
    public void getNonExistingSet() throws Exception {
        // Get the set
        restSetMockMvc.perform(get("/api/sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSet() throws Exception {
        // Initialize the database
        setRepository.save(set);

        int databaseSizeBeforeUpdate = setRepository.findAll().size();

        // Update the set
        Set updatedSet = setRepository.findById(set.getId()).get();
        updatedSet
            .reps(UPDATED_REPS)
            .weight(UPDATED_WEIGHT)
            .exercise(UPDATED_EXERCISE);

        restSetMockMvc.perform(put("/api/sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSet)))
            .andExpect(status().isOk());

        // Validate the Set in the database
        List<Set> setList = setRepository.findAll();
        assertThat(setList).hasSize(databaseSizeBeforeUpdate);
        Set testSet = setList.get(setList.size() - 1);
        assertThat(testSet.getReps()).isEqualTo(UPDATED_REPS);
        assertThat(testSet.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testSet.getExercise()).isEqualTo(UPDATED_EXERCISE);
    }

    @Test
    public void updateNonExistingSet() throws Exception {
        int databaseSizeBeforeUpdate = setRepository.findAll().size();

        // Create the Set

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSetMockMvc.perform(put("/api/sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(set)))
            .andExpect(status().isBadRequest());

        // Validate the Set in the database
        List<Set> setList = setRepository.findAll();
        assertThat(setList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSet() throws Exception {
        // Initialize the database
        setRepository.save(set);

        int databaseSizeBeforeDelete = setRepository.findAll().size();

        // Delete the set
        restSetMockMvc.perform(delete("/api/sets/{id}", set.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Set> setList = setRepository.findAll();
        assertThat(setList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Set.class);
        Set set1 = new Set();
        set1.setId("id1");
        Set set2 = new Set();
        set2.setId(set1.getId());
        assertThat(set1).isEqualTo(set2);
        set2.setId("id2");
        assertThat(set1).isNotEqualTo(set2);
        set1.setId(null);
        assertThat(set1).isNotEqualTo(set2);
    }
}
