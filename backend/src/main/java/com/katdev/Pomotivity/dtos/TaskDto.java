package com.katdev.Pomotivity.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskDto {
    private long id;

    private String title;

    private Integer userId;

    private Boolean completed;

    private Integer estimatedPomodoros;

    private Integer actualPomodoros;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yy")
    private LocalDate dueDate;

    public TaskDto() {
    }

    public TaskDto(long id, String title, Integer userId, Boolean completed, Integer estimatedPomodoros, Integer actualPomodoros, LocalDate dueDate) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.completed = completed;
        this.estimatedPomodoros = estimatedPomodoros;
        this.actualPomodoros = actualPomodoros;
        this.dueDate = dueDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Integer getActualPomodoros() {
        return actualPomodoros;
    }

    public void setActualPomodoros(Integer actualPomodoros) {
        this.actualPomodoros = actualPomodoros;
    }

    public Integer getEstimatedPomodoros() {
        return estimatedPomodoros;
    }

    public void setEstimatedPomodoros(Integer estimatedPomodoros) {
        this.estimatedPomodoros = estimatedPomodoros;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
