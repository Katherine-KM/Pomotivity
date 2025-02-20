package com.katdev.Pomotivity.services;

import com.katdev.Pomotivity.domain.entities.Task;
import com.katdev.Pomotivity.repositories.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getAllTasksByUserId(long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task addTask(Task task) {
        taskRepository.save(task);
        return task;
    }

    public Task updateTask(Task task) {
        Optional<Task> taskOptional = taskRepository.findById(task.getId());
        if (taskOptional.isPresent()) {
            Task updatedTask = taskOptional.get();
            updatedTask.setTitle(task.getTitle());

            taskRepository.save(updatedTask);
            return updatedTask;
        }
        return null;
    }

    @Transactional
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }
}
