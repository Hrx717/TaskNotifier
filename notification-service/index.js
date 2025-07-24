const express = require('express')
const amqp = require('amqplib')

async function start() {
    try {
        const connection = await amqp.connect('amqp://rabbitmq')
        const channel = await connection.createChannel()
        await channel.assertQueue('task_created')
        console.log('Notification service listening to message')

        channel.consume('task_created', (msg) => {
            const taskData = JSON.parse(msg.content.toString())
            console.log("Notification: New Task: ", taskData.title)
            console.log("Notification details: ", taskData)
            channel.ack(msg)
        })
    } catch (error) {
        console.log('RabbitMQ Connection Failed', error.message)
    }
}

start()