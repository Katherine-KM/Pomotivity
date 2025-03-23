package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("Priority Task")
public class PriorityTask extends Task{

    @Column(name = "priority")
    private int priority;

    public PriorityTask() {}

    public PriorityTask(int priority) {
        this.priority = priority;
    }

    public PriorityTask(long id, String title, User user, Boolean completed, Integer estimatedPomodoros,
                        Integer actualPomodoros, LocalDate dueDate, LocalDateTime createdDate,
                        LocalDateTime updatedDate, int priority, String taskType) {
        super(id, title, user, completed, estimatedPomodoros, actualPomodoros, dueDate, createdDate, updatedDate,
                taskType);
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}
