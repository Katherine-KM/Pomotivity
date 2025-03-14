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

//    public List<TaskDto> getAllTasks() {
//        List<Task> listOfTasks = taskRepository.findAll();
//
//        List<TaskDto> taskDtos = listOfTasks.stream()
//                .map(task -> {
//                    TaskDto taskDto = new TaskDto();
//                    taskDto.setId(task.getId());
//                    taskDto.setTitle(task.getTitle());
//                    taskDto.setUserId(task.getUser().getId());
//                    return taskDto;
//                })
//                .toList();
//
//        return taskDtos;
//    }

//    public TaskDto getTaskById(long id) {
//        Task task = taskRepository.findById(id).orElse(null);
//        TaskDto taskDto = new TaskDto();
//        taskDto.setId(task.getId());
//        taskDto.setTitle(task.getTitle());
//        taskDto.setUserId(task.getUser().getId());
//        return taskDto;
//    }


    public List<TaskDto> filterTasks(Integer userId, Integer taskId, String title) {
        List <Task> filteredTasks = taskRepository.findAll();

        if(taskId != null) {
            Task task = taskRepository.findById(taskId.longValue()).orElse(null);
            if(task != null) {
                filteredTasks = List.of(task);
                return filteredTasks.stream()
                        .map(this::convertTaskToDto)
                        .toList();
            } else {
                return List.of();
            }
        }

        if(userId != null) {
            List <Task> task = taskRepository.findByUserId(userId);
            if(task != null) {
                filteredTasks = task;
            } else {
                return List.of();
            }
        }

        if(title != null) {
            List <Task> task = taskRepository.findByTitleContaining(title);
            if(task != null) {
                filteredTasks =
                        filteredTasks.stream().filter(tasks -> tasks.getTitle().contains(title)).collect(Collectors.toList());
            } else {
                return List.of();
            }
        }

        return filteredTasks.stream()
                .map(this::convertTaskToDto)
                .toList();
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task createdTask = new Task();
        User user = userRepository.findById(taskDto.getUserId()).orElse(null);
        createdTask.setTitle(taskDto.getTitle());
        createdTask.setUser(user);
        taskRepository.save(createdTask);

        return convertTaskToDto(createdTask);
    }

    public TaskDto updateTask(TaskDto taskDto) {
        Optional<Task> taskOptional = taskRepository.findById(taskDto.getId());
        if (taskOptional.isPresent()) {
            Task updatedTask = taskOptional.get();
            User user = userRepository.findById(taskDto.getUserId()).orElse(null);
            updatedTask.setTitle(taskDto.getTitle());
            updatedTask.setUser(user);
            taskRepository.save(updatedTask);

            return convertTaskToDto(updatedTask);
        }
        return null;
    }

    @Transactional
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    private TaskDto convertTaskToDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());
        taskDto.setTitle(task.getTitle());
        taskDto.setUserId(task.getUser().getId());
        return taskDto;
    }
}
