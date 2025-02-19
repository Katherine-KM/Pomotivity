package com.katdev.Pomotivity.repositories;

import com.katdev.Pomotivity.domain.entities.PomodoroSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PomodoroSettingRepository extends JpaRepository<PomodoroSetting, Long> {

}
