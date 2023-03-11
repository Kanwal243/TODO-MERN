const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const todoItemsModel = require('./models/todosItem')

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("DB connection established")
    })
    .catch(err => {
        console.log(err)
    })

//Get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await todoItemsModel.find({});
        res.status(200).json(allTodos)

    } catch (error) {
        console.log(error)
    }

});
//Add new todo
app.post('/todo', async (req, res) => {

    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save();
        res.status(200).json("Item added to database")
    } catch (error) {
        res.json(error)
    }
});
//Update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json("Item updated in the database")

    } catch (error) {
        console.log(error)

    }
}
)

//Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Item deleted from the database")

    } catch (error) {
        console.log(error)

    }
})

const PORT = process.env.PORT || 5500;
// app.listen(port)
app.listen(PORT, () => console.log(`Todo app listening http://localhost:${PORT}`));

