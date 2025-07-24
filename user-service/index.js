const express = require('express')
const mongoose = require('mongoose')

const User = require('./Model/User.schema')

const app = express()
const PORT = process.env.PORT | 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://mongo:27017/users')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err))

//create user
app.post('/users', async (req, res) => {
  console.log('Request Body:', req.body);
  const { name, email } = req.body;

  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: 'User created', user });
    console.log('user created')
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
})

// get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({"users": users})
    } catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})