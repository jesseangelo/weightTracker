package com.hollowleg.weighttracker.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * A Set.
 */
@Document(collection = "set")
public class Set implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("reps")
    private Integer reps;

    @Field("weight")
    private Integer weight;

    @Field("exercise")
    private Integer exercise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getReps() {
        return reps;
    }

    public Set reps(Integer reps) {
        this.reps = reps;
        return this;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Integer getWeight() {
        return weight;
    }

    public Set weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getExercise() {
        return exercise;
    }

    public Set exercise(Integer exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Integer exercise) {
        this.exercise = exercise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Set)) {
            return false;
        }
        return id != null && id.equals(((Set) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Set{" +
            "id=" + getId() +
            ", reps=" + getReps() +
            ", weight=" + getWeight() +
            ", exercise=" + getExercise() +
            "}";
    }
}
