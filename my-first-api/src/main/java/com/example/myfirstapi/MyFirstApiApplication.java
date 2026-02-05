package com.example.myfirstapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class MyFirstApiApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(MyFirstApiApplication.class, args);

        // שליפת השירות שיצרנו
        AwsService awsService = context.getBean(AwsService.class);

        System.out.println("--- Searching for AWS Instance ID ---");

        awsService.findInstanceIdByIp("172.31.88.181");
        System.out.println("-------------------------------------");
    }
}