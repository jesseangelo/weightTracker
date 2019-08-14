package com.hollowleg.weighttracker.web.rest;

import com.hollowleg.weighttracker.WeightTrackerApp;
import com.hollowleg.weighttracker.domain.TrainingSession;
import com.hollowleg.weighttracker.repository.TrainingSessionRepository;
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


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.hollowleg.weighttracker.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TrainingSessionResource} REST controller.
 */
@SpringBootTest(classes = WeightTrackerApp.class)
public class TrainingSessionResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_SETS = 1;
    private static final Integer UPDATED_SETS = 2;

    @Autowired
    private TrainingSessionRepository trainingSessionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTrainingSessionMockMvc;

    private TrainingSession trainingSession;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingSessionResource trainingSessionResource = new TrainingSessionResource(trainingSessionRepository);
        this.restTrainingSessionMockMvc = MockMvcBuilders.standaloneSetup(trainingSessionResource)
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
    public static TrainingSession createEntity() {
        TrainingSession trainingSession = new TrainingSession()
            .date(DEFAULT_DATE)
            .sets(DEFAULT_SETS);
        return trainingSession;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingSession createUpdatedEntity() {
        TrainingSession trainingSession = new TrainingSession()
            .date(UPDATED_DATE)
            .sets(UPDATED_SETS);
        return trainingSession;
    }

    @BeforeEach
    public void initTest() {
        trainingSessionRepository.deleteAll();
        trainingSession = createEntity();
    }

    @Test
    public void createTrainingSession() throws Exception {
        int databaseSizeBeforeCreate = trainingSessionRepository.findAll().size();

        // Create the TrainingSession
        restTrainingSessionMockMvc.perform(post("/api/training-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingSession)))
            .andExpect(status().isCreated());

        // Validate the TrainingSession in the database
        List<TrainingSession> trainingSessionList = trainingSessionRepository.findAll();
        assertThat(trainingSessionList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingSession testTrainingSession = trainingSessionList.get(trainingSessionList.size() - 1);
        assertThat(testTrainingSession.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTrainingSession.getSets()).isEqualTo(DEFAULT_SETS);
    }

    @Test
    public void createTrainingSessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingSessionRepository.findAll().size();

        // Create the TrainingSession with an existing ID
        trainingSession.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingSessionMockMvc.perform(post("/api/training-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingSession)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingSession in the database
        List<TrainingSession> trainingSessionList = trainingSessionRepository.findAll();
        assertThat(trainingSessionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllTrainingSessions() throws Exception {
        // Initialize the database
        trainingSessionRepository.save(trainingSession);

        // Get all the trainingSessionList
        restTrainingSessionMockMvc.perform(get("/api/training-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingSession.getId())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].sets").value(hasItem(DEFAULT_SETS)));
    }
    
    @Test
    public void getTrainingSession() throws Exception {
        // Initialize the database
        trainingSessionRepository.save(trainingSession);

        // Get the trainingSession
        restTrainingSessionMockMvc.perform(get("/api/training-sessions/{id}", trainingSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainingSession.getId()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.sets").value(DEFAULT_SETS));
    }

    @Test
    public void getNonExistingTrainingSession() throws Exception {
        // Get the trainingSession
        restTrainingSessionMockMvc.perform(get("/api/training-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTrainingSession() throws Exception {
        // Initialize the database
        trainingSessionRepository.save(trainingSession);

        int databaseSizeBeforeUpdate = trainingSessionRepository.findAll().size();

        // Update the trainingSession
        TrainingSession updatedTrainingSession = trainingSessionRepository.findById(trainingSession.getId()).get();
        updatedTrainingSession
            .date(UPDATED_DATE)
            .sets(UPDATED_SETS);

        restTrainingSessionMockMvc.perform(put("/api/training-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingSession)))
            .andExpect(status().isOk());

        // Validate the TrainingSession in the database
        List<TrainingSession> trainingSessionList = trainingSessionRepository.findAll();
        assertThat(trainingSessionList).hasSize(databaseSizeBeforeUpdate);
        TrainingSession testTrainingSession = trainingSessionList.get(trainingSessionList.size() - 1);
        assertThat(testTrainingSession.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTrainingSession.getSets()).isEqualTo(UPDATED_SETS);
    }

    @Test
    public void updateNonExistingTrainingSession() throws Exception {
        int databaseSizeBeforeUpdate = trainingSessionRepository.findAll().size();

        // Create the TrainingSession

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingSessionMockMvc.perform(put("/api/training-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingSession)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingSession in the database
        List<TrainingSession> trainingSessionList = trainingSessionRepository.findAll();
        assertThat(trainingSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTrainingSession() throws Exception {
        // Initialize the database
        trainingSessionRepository.save(trainingSession);

        int databaseSizeBeforeDelete = trainingSessionRepository.findAll().size();

        // Delete the trainingSession
        restTrainingSessionMockMvc.perform(delete("/api/training-sessions/{id}", trainingSession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TrainingSession> trainingSessionList = trainingSessionRepository.findAll();
        assertThat(trainingSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingSession.class);
        TrainingSession trainingSession1 = new TrainingSession();
        trainingSession1.setId("id1");
        TrainingSession trainingSession2 = new TrainingSession();
        trainingSession2.setId(trainingSession1.getId());
        assertThat(trainingSession1).isEqualTo(trainingSession2);
        trainingSession2.setId("id2");
        assertThat(trainingSession1).isNotEqualTo(trainingSession2);
        trainingSession1.setId(null);
        assertThat(trainingSession1).isNotEqualTo(trainingSession2);
    }
}
