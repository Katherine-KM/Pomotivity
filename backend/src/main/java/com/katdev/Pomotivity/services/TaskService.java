package com.katdev.Pomotivity.services;

import com.katdev.Pomotivity.domain.entities.Task;
import com.katdev.Pomotivity.domain.entities.User;
import com.katdev.Pomotivity.dtos.TaskDto;
import com.katdev.Pomotivity.repositories.TaskRepository;
import com.katdev.Pomotivity.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDto> getAllTasks() {
        List<Task> listOfTasks = taskRepository.findAll();

        List<TaskDto> taskDtos = listOfTasks.stream()
                .map(task -> {
                    TaskDto taskDto = new TaskDto();
                    taskDto.setId(task.getId());
                    taskDto.setTitle(task.getTitle());
                    taskDto.setUserId(task.getUser().getId());
                    return taskDto;
                })
                .collect(Collectors.toList());

        return taskDtos;
    }

    public Task getTaskById(long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> getAllTasksByUserId(long userId) {
        return taskRepository.findByUserId(userId);
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task createdTask = new Task();
        User user = userRepository.findById(taskDto.getUserId()).orElse(null);
        createdTask.setTitle(taskDto.getTitle());
        createdTask.setUser(user);

        Task savedTask = taskRepository.save(createdTask);

        TaskDto savedTaskDto = new TaskDto();
        savedTaskDto.setId(savedTask.getId());
        savedTaskDto.setTitle(savedTask.getTitle());
        savedTaskDto.setUserId(savedTask.getUser().getId());

        return savedTaskDto;
    }

    public TaskDto updateTask(TaskDto taskDto) {
        Optional<Task> taskOptional = taskRepository.findById(taskDto.getId());
        if (taskOptional.isPresent()) {
            Task updatedTask = taskOptional.get();
            User user = userRepository.findById(taskDto.getUserId()).orElse(null);
            updatedTask.setTitle(taskDto.getTitle());
            updatedTask.setUser(user);
            taskRepository.save(updatedTask);

            TaskDto savedTaskDto = new TaskDto();
            savedTaskDto.setId(updatedTask.getId());
            savedTaskDto.setTitle(updatedTask.getTitle());
            savedTaskDto.setUserId(updatedTask.getUser().getId());

            return savedTaskDto;
        }
        return null;
    }

    @Transactional
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }
}
