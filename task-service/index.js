const express = require('express')
const mongoose = require('mongoose')
const amqp = require('amqplib')

const Task = require('./Model/task.schema')

const app = express()
const PORT = process.env.PORT | 3002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://mongo:27017/tasks')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err))

// rabbitMQ
let channel, connection;

async function connectRabbitMQWithRetry(retries = 5, delay = 3000) {
    while(retries) {
        try {
            connection = await amqp.connect("amqp://rabbitmq")
            channel = await connection.createChannel()
            await channel.assertQueue('task_created')
            console.log('Connected to RabbitMQ')
            return
        } catch (error) {
            console.log('RabbitMQ connection Error: ', error.message)
            retries--;
            console.log('Retries left: ', retries)
            await new Promise(res => setTimeout(res, delay))
        }
    }
}

// create task
app.post('/tasks', async (req, res) => {
    console.log('Request Body:', req.body);
    const {title, description, userId} = req.body

    try {
        const task = new Task({ title, description, userId });
        await task.save();

        const message = {taskId: task._id, userId, title}
        if(channel) {
            channel.sendToQueue('task_created', Buffer.from(
                JSON.stringify(message)
            ))
        }

        res.status(201).json({ message: 'Task created', task });
        console.log('task created')
    } catch (error) {
        console.log('Error saving task:', error);
        res.status(500).json({ message: 'Error creating task', error });
    }
})

// get all users
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json({"tasks": tasks})
    } catch (error) {
        console.log('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log('Task Service running on port: ', PORT)
    connectRabbitMQWithRetry()
})