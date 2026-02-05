package com.example.myfirstapi;

public class CpuDataDTO {
    private String timestamp;
    private Double average;

    public CpuDataDTO(String timestamp, Double average) {
        this.timestamp = timestamp;
        this.average = average;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Double getAverage() {
        return average;
    }
}