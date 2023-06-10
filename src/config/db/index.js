

const mongoose = require('mongoose')

async function connect () {
    try {
        await mongoose.connect('mongodb+srv://todo:ducvu0969@cluster0.rtm9n9x.mongodb.net/todo?retryWrites=true&w=majority', {
            useNewUrlParser  : true,
            useUnifiedTopology : true
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connect}