package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("Pomodoro")
public class PomodoroTaskList extends TaskList {
    @Column(name = "estimated_pomodoros", nullable = false)
    private int estimatedPomodoros;

    @Column(name = "completed_pomodoros", nullable = false)
    private int completedPomodoros = 0;
}
