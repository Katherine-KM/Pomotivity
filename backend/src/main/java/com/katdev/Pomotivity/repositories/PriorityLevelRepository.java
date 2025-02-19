package com.katdev.Pomotivity.repositories;

import com.katdev.Pomotivity.domain.entities.PriorityLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriorityLevelRepository extends JpaRepository<PriorityLevel, Integer> {
}
