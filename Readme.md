# Task Management

- Node.js & Experss.js
- Microservice
- Docker (Containerization) & Docker Compose (Manage Containers)
- RabbitMQ
- Mongoose (Object Data Modeling Library) & MongoDB

<img width="1879" height="873" alt="Screenshot 2025-07-24 115341" src="https://github.com/user-attachments/assets/9a70457a-11d2-4495-a01b-ce9cf8d84394" />

## User Service

Manage User:
- Create User
- Get User
- Has its own copy of Database (MonogoDB)

## Task Service

- Manage all the task against the perticular user
- It also has its own copy of Database

## Notification service

- Send notifications whenever a new a task is created
- Message queue between Notification Service and Task
- Asynchronous Communication using RabbitMQ (Message Broker)

Note - All these above service are dockerize

## MongoDB 
- User DB
- Task DB

## Routes
- User Service
    - GET /users: FETCH all the users
    - POST /users: Create new user


## To run this project
- Clone the project
- Run `docker-compose up --build -d`
