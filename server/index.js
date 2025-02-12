const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // This allows cookies and other credentials to be sent across domains
}));

app.use(express.json());

mongoose.connect("mongodb+srv://harshkhandelwal:myfirstproject@cluster0.1cjfyg0.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0");

app.get('/', (req, res) => {
  res.json("Welcome to hello world!");
});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
