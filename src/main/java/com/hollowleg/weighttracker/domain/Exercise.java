package com.hollowleg.weighttracker.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

import com.hollowleg.weighttracker.domain.enumeration.ExerciseType;

import com.hollowleg.weighttracker.domain.enumeration.ExerciseBodyParts;

/**
 * A Exercise.
 */
@Document(collection = "exercise")
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("type")
    private ExerciseType type;

    @Field("body_parts")
    private List<ExerciseBodyParts> bodyParts;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Exercise name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ExerciseType getType() {
        return type;
    }

    public Exercise type(ExerciseType type) {
        this.type = type;
        return this;
    }

    public void setType(ExerciseType type) {
        this.type = type;
    }

    public List<ExerciseBodyParts> getBodyParts() {
        return bodyParts;
    }

    public Exercise bodyParts(List<ExerciseBodyParts> bodyParts) {
        this.bodyParts = bodyParts;
        return this;
    }

    public void setBodyParts(List<ExerciseBodyParts> bodyParts) {
        this.bodyParts = bodyParts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exercise)) {
            return false;
        }
        return id != null && id.equals(((Exercise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Exercise{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", bodyParts='" + getBodyParts() + "'" +
            "}";
    }
}
