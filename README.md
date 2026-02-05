# AWS EC2 CPU Monitoring Dashboard

**Faddom – Home Assignment**

A full-stack application designed to monitor, analyze, and visualize CPU performance metrics for an AWS EC2 instance in near real-time.

---

## Project Architecture

### Backend
- Java 21  
- Spring Boot 3.2.2  
- AWS SDK v2 (EC2 & CloudWatch)

### Frontend
- React 18  
- TypeScript  
- Vite  
- Recharts

---

## Features

### 📊 Real-time Visualization
- Interactive CPU Usage Chart built with Recharts  
- Time Range Selection: **1 Hour, 3 Hours, 24 Hours**  
- Live Statistics: Automatic calculation of **Average, Maximum, and Minimum** CPU usage  
- Auto-Refresh: Backend polling every **60 seconds**

---

### 🛡️ Resource Protection
**Termination Protection**  
- Ensures `disableApiTermination` is enabled for the monitored EC2 instance (as required)

**Graceful Error Handling**  
- Handles AWS IAM permission limitations (e.g., `403 Forbidden`) without interrupting monitoring

---

### 🎨 Modern UI
- Clean, centered dashboard layout  
- Focus on readability and professional, minimal design

---

## Setup & Running Instructions

### 1. Prerequisites
- JDK 21  
- Node.js (v18+)  
- Maven  

---

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend directory  
2. Update `src/main/resources/application.properties` with the provided AWS credentials  
3. Run the application:
   ```bash
   mvn spring-boot:run
Backend API will be available at:
http://localhost:8080

### 3. Frontend Setup (React)

1. Navigate to the frontend directory  
2. Install dependencies:
   ```bash
   npm install
Start the UI:

npm run dev
Dashboard will be available at:  
`http://localhost:5173`

---

## Implementation Details

### Termination Protection
- **Code Location:** `AwsService.java` → `setTerminationProtection()`

**Note:**  
During testing, it was identified that the provided IAM user lacks the  
`ec2:ModifyInstanceAttribute` permission.  

This limitation is handled via a try-catch block that logs the restriction  
while allowing CPU monitoring functionality to continue uninterrupted.

---

### Data Resolution (CloudWatch Periods)
The backend dynamically adjusts metric resolution based on the selected time range:

- **1h / 3h:** 60-second intervals (high resolution)  
- **24h:** 300-second intervals (5-minute resolution)

---

## Summary
This project demonstrates end-to-end integration between AWS services,  
a Spring Boot backend, and a modern React frontend,  
with a focus on robustness, observability, and clean architecture.
