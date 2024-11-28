const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

let tasks = []; // Liste de tâches en mémoire

app.use(cors());

app.use(bodyParser.json());

// Routes
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (title) {
        tasks.push({ id: tasks.length + 1, title });
        res.status(201).json({ message: 'Task added!' });
    } else {
        res.status(400).json({ message: 'Title is required!' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.status(200).json({ message: 'Task deleted!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
