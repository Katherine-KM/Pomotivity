package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "priority_levels")
public class PriorityLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false, unique = true)
    private int id;

    @OneToMany(mappedBy = "priorityLevelId")
    private List<Task> tasks = new ArrayList<>();

    @Column(nullable = false)
    private String name;

}
