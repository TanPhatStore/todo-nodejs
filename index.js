const express = require('express')
const path = require('path')
const morgan =  require('morgan')
const cors = require('cors')
const db = require('./src/config/db')
const Task = require('./src/app/task')
const User = require('./src/app/user')
const app = express()
const port = 8080


app.use(express.static(path.join(__dirname, "src/public")))
app.use(morgan('combined'))
app.use(express.urlencoded({
    extended : true
}))
app.use(express.json())

app.use(cors([{
    origin : "https://todo-reactjs-six.vercel.app"
},
{
    origin : "https://todo-reactjs-six.vercel.app"
}
]))

//Connect MongoDB
db.connect()

app.get('/', async (req, res) => {
    res.send('NODE JS')
})

app.get('/api/tasks', async (req, res) => {
    try {
        const taskDocuments = await Task.find({})
        res.json(taskDocuments)
    } catch (error) {
        res.status(500).json({error})
    }   
})

app.post('/insert-task', async (req, res) => {
    const task = new Task(req.body)
    task.dateTime = new Date()

    task.save()
        .then(() => res.redirect('https://todo-reactjs-six.vercel.app/home'))
        .catch(error => res.status(500).json({error}))
})

app.post('/update-task', async (req, res) => {
    const task = req.body
    Task.updateOne({_id : req.body._id}, task)
        .then(() => res.redirect('https://todo-reactjs-six.vercel.app/home'))
        .catch(error => res.status(500).json({error}))
})

app.post('/delete-task', async (req, res) => {
    const id = req.body._id

    await Task.deleteOne({_id : id})
        .then(() => res.redirect('https://todo-reactjs-six.vercel.app/home'))
        .catch(error => res.status(500).json({error}))
})

app.post('/deleteAll-task', async (req, res) => {
    await Task.deleteMany({})
        .then(() => res.redirect(''))
        .catch(error => res.status(500).json({error}))
})

//----------------------------------------------User

app.get('/api/users', async (req, res) => {
    try {
        const userDocuments = await User.find({})
        res.json(userDocuments)
    } catch (error) {
        res.status(500).json({error})
    }   
})

app.post('/insert-user', async (req, res) => {
    const user = new User(req.body) 
    user.save()
    .then(() => res.redirect('https://todo-reactjs-six.vercel.app'))
    .catch(error => res.status(500).json({error}))
})

app.post('/update-user', async (req, res) => {
    const user = req.body

    User.updateOne({_id : req.body._id}, user)
        .then(() => res.redirect(''))
        .catch(error => res.status(500).json({error}))
})

app.post('/delete-user', async (req, res) => {
    const id = req.body._id

    await User.deleteOne({_id : id})
        .then(() => res.redirect(''))
        .catch(error => res.status(500).json({error}))
})

app.post('/deleteAll-user', async (req, res) => {
    await User.deleteMany({})
        .then(() => res.redirect(''))
        .catch(error => res.status(500).json({error}))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})