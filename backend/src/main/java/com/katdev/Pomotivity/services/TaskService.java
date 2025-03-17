package com.katdev.Pomotivity.services;

import com.katdev.Pomotivity.domain.entities.Task;
import com.katdev.Pomotivity.domain.entities.User;
import com.katdev.Pomotivity.dtos.TaskDto;
import com.katdev.Pomotivity.repositories.TaskRepository;
import com.katdev.Pomotivity.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
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


    public List<TaskDto> filterTasks(Integer userId, Integer taskId, String title, Boolean completed, LocalDate dueDate) {
        List <Task> filteredTasks = taskRepository.findByUserId(userId);

        if(title != null) {
                filteredTasks = taskRepository.findByUserIdAndTitleIgnoreCaseContaining(userId, title);
        }

        if(completed != null) {
                filteredTasks =
                        filteredTasks.stream().filter(tasks -> tasks.getCompleted().equals(completed)).collect(Collectors.toList());
        }

        if(dueDate != null) {
            filteredTasks = filteredTasks.stream().filter(tasks -> tasks.getDueDate().equals(dueDate)).collect(Collectors.toList());
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
        createdTask.setDueDate(taskDto.getDueDate());
        createdTask.setEstimatedPomodoros(taskDto.getEstimatedPomodoros());
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
            updatedTask.setDueDate(taskDto.getDueDate());
            updatedTask.setCompleted(taskDto.getCompleted());
            updatedTask.setEstimatedPomodoros(taskDto.getEstimatedPomodoros());
            updatedTask.setActualPomodoros(taskDto.getActualPomodoros());
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
        taskDto.setDueDate(task.getDueDate());
        taskDto.setEstimatedPomodoros(task.getEstimatedPomodoros());
        taskDto.setActualPomodoros(task.getActualPomodoros());
        taskDto.setCompleted(task.getCompleted());
        return taskDto;
    }
}
