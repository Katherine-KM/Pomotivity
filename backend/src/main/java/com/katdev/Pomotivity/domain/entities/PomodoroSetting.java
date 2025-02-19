package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pomodoro_settings")
public class PomodoroSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccount userId;

    @Column(name = "focus_time", nullable = false)
    private int focusTime;

    @Column(name = "short_break", nullable = false)
    private int shortBreak;

    @Column(name = "long_break", nullable = false)
    private int longBreak;

    @Column(name = "long_break_interval", nullable = false)
    private int longBreakInterval;

    @PrePersist
    protected void onCreate() {
        if(this.focusTime == 0) this.focusTime = 25;
        if(this.shortBreak == 0) this.shortBreak = 5;
        if(this.longBreak == 0) this.longBreak = 15;
    }
}
