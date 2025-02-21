package com.katdev.Pomotivity.dtos;

import jakarta.persistence.Column;

public class TaskDto {
    private long id;

    private String title;

    private Integer userId;

    public TaskDto() {
    }

    public TaskDto(long id, String title, Integer userId) {
        this.id = id;
        this.title = title;
        this.userId = userId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
