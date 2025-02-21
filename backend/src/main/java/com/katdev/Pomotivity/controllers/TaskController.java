package com.katdev.Pomotivity.controllers;

import com.katdev.Pomotivity.domain.entities.Task;
import com.katdev.Pomotivity.dtos.TaskDto;
import com.katdev.Pomotivity.repositories.UserRepository;
import com.katdev.Pomotivity.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskDto> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTaskDto = taskService.addTask(taskDto);
        return new ResponseEntity<>(savedTaskDto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        Task updatedTask = taskService.updateTask(task);

        if(updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable long taskId) {
        taskService.deleteTask(taskId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
