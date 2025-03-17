package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Boolean completed;

    @Column(name = "estimated_pomodoros", nullable = false)
    private Integer estimatedPomodoros;

    @Column(name = "actual_pomodoros", nullable = false)
    private Integer actualPomodoros;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
        this.completed = false;
        this.actualPomodoros = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = LocalDateTime.now();
    }

    public Task() {
    }

    public Task(long id, String title, User user, Boolean completed, Integer estimatedPomodoros, Integer actualPomodoros, LocalDate dueDate, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.completed = completed;
        this.estimatedPomodoros = estimatedPomodoros;
        this.actualPomodoros = actualPomodoros;
        this.dueDate = dueDate;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Integer getEstimatedPomodoros() {
        return estimatedPomodoros;
    }

    public void setEstimatedPomodoros(Integer estimatedPomodoros) {
        this.estimatedPomodoros = estimatedPomodoros;
    }

    public Integer getActualPomodoros() {
        return actualPomodoros;
    }

    public void setActualPomodoros(Integer actualPomodoros) {
        this.actualPomodoros = actualPomodoros;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }
}
