package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_list_id")
    private TaskList taskListId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "priority_level_id")
    private PriorityLevel priorityLevelId;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "estimated_pomodoros", nullable = false)
    private int estimatedPomodoros = 0;

    @Column(name = "total_pomodoros")
    private int totalPomodoros = 0;

    @Column(name = "position")
    private int position = 0;

    @Column(name = "completed")
    private boolean completed = false;

    @Column(name = "completed_date")
    private LocalDateTime completedDate = null;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
}
