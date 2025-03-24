package com.katdev.Pomotivity.domain.entities;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    @Test
    void testOnCreate() {
        System.out.println("Test if the Task is created and values are generated automatically when created");

        Task task = new Task();

        task.onCreate();

        System.out.println("Created Date " + task.getCreatedDate());
        assertNotNull(task.getCreatedDate(), "Created date should be set.");

        System.out.println("Updated Date " + task.getUpdatedDate());
        assertNotNull(task.getUpdatedDate(), "Updated date should be set.");

        System.out.println("Completed should be set to false: " + task.getCompleted());
        assertFalse(task.getCompleted(), "Completed should be set to false");

        System.out.println("Actual Pomodoros should be set to 0: " + task.getActualPomodoros());
        assertEquals(0, task.getActualPomodoros(), "Actual pomodoros should be set to 0");
    }

    @Test
    void testOnUpdate() throws InterruptedException {
        System.out.println("Test if the Task updated date is changed when the task is updated");

        Task task = new Task();
        task.onCreate();

        LocalDateTime originalUpdatedDate = task.getUpdatedDate();

        Thread.sleep(2500);

        task.setTitle("This is an updated Title");
        task.onUpdate();

        System.out.println("Original Updated Date " + originalUpdatedDate);
        System.out.println("Updated Date " + task.getUpdatedDate());

        assertNotEquals(originalUpdatedDate, task.getUpdatedDate(),
                "Original Updated Date and the current Updated Date Should not be equal");
        assertNotNull(task.getUpdatedDate(), "Updated date should be set.");
    }
}