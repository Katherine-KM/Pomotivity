package com.katdev.Pomotivity.controllers;

import com.katdev.Pomotivity.domain.entities.User;
import com.katdev.Pomotivity.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value="/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT.value()).body("Email already exists");
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED.value()).body("User Registered Successfully");
        }
    }

}
