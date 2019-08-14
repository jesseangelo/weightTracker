package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.WeightTrackerApp;
import com.hollowleg.weighttracker.domain.Lifter;
import com.hollowleg.weighttracker.repository.LifterRepository;
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
 * Integration tests for the {@Link LifterResource} REST controller.
 */
@SpringBootTest(classes = WeightTrackerApp.class)
public class LifterResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    @Autowired
    private LifterRepository lifterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLifterMockMvc;

    private Lifter lifter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LifterResource lifterResource = new LifterResource(lifterRepository);
        this.restLifterMockMvc = MockMvcBuilders.standaloneSetup(lifterResource)
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
    public static Lifter createEntity() {
        Lifter lifter = new Lifter()
            .name(DEFAULT_NAME)
            .weight(DEFAULT_WEIGHT);
        return lifter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lifter createUpdatedEntity() {
        Lifter lifter = new Lifter()
            .name(UPDATED_NAME)
            .weight(UPDATED_WEIGHT);
        return lifter;
    }

    @BeforeEach
    public void initTest() {
        lifterRepository.deleteAll();
        lifter = createEntity();
    }

    @Test
    public void createLifter() throws Exception {
        int databaseSizeBeforeCreate = lifterRepository.findAll().size();

        // Create the Lifter
        restLifterMockMvc.perform(post("/api/lifters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lifter)))
            .andExpect(status().isCreated());

        // Validate the Lifter in the database
        List<Lifter> lifterList = lifterRepository.findAll();
        assertThat(lifterList).hasSize(databaseSizeBeforeCreate + 1);
        Lifter testLifter = lifterList.get(lifterList.size() - 1);
        assertThat(testLifter.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLifter.getWeight()).isEqualTo(DEFAULT_WEIGHT);
    }

    @Test
    public void createLifterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lifterRepository.findAll().size();

        // Create the Lifter with an existing ID
        lifter.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLifterMockMvc.perform(post("/api/lifters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lifter)))
            .andExpect(status().isBadRequest());

        // Validate the Lifter in the database
        List<Lifter> lifterList = lifterRepository.findAll();
        assertThat(lifterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllLifters() throws Exception {
        // Initialize the database
        lifterRepository.save(lifter);

        // Get all the lifterList
        restLifterMockMvc.perform(get("/api/lifters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lifter.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)));
    }
    
    @Test
    public void getLifter() throws Exception {
        // Initialize the database
        lifterRepository.save(lifter);

        // Get the lifter
        restLifterMockMvc.perform(get("/api/lifters/{id}", lifter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lifter.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT));
    }

    @Test
    public void getNonExistingLifter() throws Exception {
        // Get the lifter
        restLifterMockMvc.perform(get("/api/lifters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLifter() throws Exception {
        // Initialize the database
        lifterRepository.save(lifter);

        int databaseSizeBeforeUpdate = lifterRepository.findAll().size();

        // Update the lifter
        Lifter updatedLifter = lifterRepository.findById(lifter.getId()).get();
        updatedLifter
            .name(UPDATED_NAME)
            .weight(UPDATED_WEIGHT);

        restLifterMockMvc.perform(put("/api/lifters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLifter)))
            .andExpect(status().isOk());

        // Validate the Lifter in the database
        List<Lifter> lifterList = lifterRepository.findAll();
        assertThat(lifterList).hasSize(databaseSizeBeforeUpdate);
        Lifter testLifter = lifterList.get(lifterList.size() - 1);
        assertThat(testLifter.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLifter.getWeight()).isEqualTo(UPDATED_WEIGHT);
    }

    @Test
    public void updateNonExistingLifter() throws Exception {
        int databaseSizeBeforeUpdate = lifterRepository.findAll().size();

        // Create the Lifter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLifterMockMvc.perform(put("/api/lifters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lifter)))
            .andExpect(status().isBadRequest());

        // Validate the Lifter in the database
        List<Lifter> lifterList = lifterRepository.findAll();
        assertThat(lifterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLifter() throws Exception {
        // Initialize the database
        lifterRepository.save(lifter);

        int databaseSizeBeforeDelete = lifterRepository.findAll().size();

        // Delete the lifter
        restLifterMockMvc.perform(delete("/api/lifters/{id}", lifter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lifter> lifterList = lifterRepository.findAll();
        assertThat(lifterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lifter.class);
        Lifter lifter1 = new Lifter();
        lifter1.setId("id1");
        Lifter lifter2 = new Lifter();
        lifter2.setId(lifter1.getId());
        assertThat(lifter1).isEqualTo(lifter2);
        lifter2.setId("id2");
        assertThat(lifter1).isNotEqualTo(lifter2);
        lifter1.setId(null);
        assertThat(lifter1).isNotEqualTo(lifter2);
    }
}
