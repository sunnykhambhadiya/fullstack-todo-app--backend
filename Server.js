const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./routes/ToDoRoute')

require('dotenv').config()

const app = express();
const PORT = process.env.port || 3000

app.use(express.json());
app.use(cors());

mongoose
const uri = 'mongodb://127.0.0.1:27017/todoapp'; // Replace with your connection string
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB.....');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(router)
app.post("/save", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newToDo = new ToDoModel({ text });
    await newToDo.save();
    res.status(201).json(newToDo);
  } catch (error) {
    console.error("Error saving ToDo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const todos = await ToDoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching ToDos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  app.listen(PORT, () => console.log('Listening on: ${PORT}'))