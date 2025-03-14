package com.katdev.Pomotivity.controllers;

import com.katdev.Pomotivity.Security.CustomUserDetails;
import com.katdev.Pomotivity.Security.LoggedInUser;
import com.katdev.Pomotivity.domain.entities.Task;
import com.katdev.Pomotivity.dtos.TaskDto;
import com.katdev.Pomotivity.repositories.UserRepository;
import com.katdev.Pomotivity.services.TaskService;
import com.katdev.Pomotivity.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public List <TaskDto> getTasks(
            @RequestParam(required = false) Integer taskId,
            @RequestParam(required = false) String taskTitle,
            @LoggedInUser CustomUserDetails loggedInUser
    ) {
        Integer userId = loggedInUser.getUser().getId();
        return taskService.filterTasks(userId, taskId, taskTitle);
    }

    @PostMapping
    public ResponseEntity<TaskDto> addTask(
            @RequestBody TaskDto taskDto,
            @LoggedInUser CustomUserDetails loggedinUser
    ) {
        taskDto.setUserId(loggedinUser.getUser().getId());
        TaskDto savedTaskDto = taskService.addTask(taskDto);
        return new ResponseEntity<>(savedTaskDto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(taskDto);

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
