package com.katdev.Pomotivity.domain.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("General")
public class GeneralTaskList extends TaskList{

}
