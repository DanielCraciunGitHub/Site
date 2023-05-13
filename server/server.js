//BRyTy5nAvt0AfQbz
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const [db, collection] = ['goals_app', 'goals_data']
const connectionString = `mongodb+srv://Kingemperor07:BRyTy5nAvt0AfQbz@goalapp.bbr8iwx.mongodb.net/${db}?retryWrites=true&w=majority` 

mongoose.connect(connectionString)
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('Connected to Database'))

const dataSchema = new mongoose.Schema({
  id: { type: String, required: false },
  title: { type: String, required: false },
  goals: { type: Array, required: false },
});
const dataModel = mongoose.model('data', dataSchema, collection);

app.post('/api', async (req, res) => {
  try {
    const data = req.body
    await dataModel.deleteMany({})
    await dataModel.insertMany(data)
  }
  catch (error) {
    console.error('Error:', error);
  }
})
app.get('/api', async (req, res) => {
  try {
    const data = await dataModel.find().select('-_id id title goals').lean()
    res.json(data)
  }
  catch (error) {
    console.error('Error: ', error)
  }
})
app.listen(5000, () => console.log('Server Started'))

