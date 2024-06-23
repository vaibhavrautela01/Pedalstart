require('dotenv').config();      //load env

const express = require('express');   //express 

const mongoose = require('mongoose');   //Db

const cors = require('cors'); //middlewear client & server


const TodoModel = require('./Models/Todo');  //Schema of mongo


const PORT=process.env.PORT || 8000;  //for dynamic port when hosting hosted in aws


const app = express();  


app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URL/*'mongodb://127.0.0.1:27017/taskmanager'*/, { useNewUrlParser: true, useUnifiedTopology: true });      //dynamic  and localhost



app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))     
        .catch(err => res.json(err));
});



app.get('/task/:id', (req, res) => {
    const { id } = req.params;                             // id   //params

    TodoModel.findById(id)
        .then(task => {                                             //choose specific document based on id
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        })
        .catch(err => res.status(500).json({ error: 'Failed to retrieve task', details: err.message }));
});




app.post('/', (req, res) => {
    const { title, description, date } = req.body;      //comming from frontend

    TodoModel.create({
        title,
        description,                                    //Create a new todo
        date,
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});



app.put('/update/:id', (req, res) => {

    const { id } = req.params;

    const { title, description, date, completed } = req.body;

    TodoModel.findByIdAndUpdate(id, { title, description, date, completed }, { new: true })    //find & update mongo


        .then(updatedTodo => {
            if (!updatedTodo) {                                                            // Update a todo by ID

                return res.status(404).json({ error: 'Todo not found' });              
            }
            res.json(updatedTodo);
        })



        .catch(err => res.status(500).json({ error: 'Update failed', details: err.message }));
});




app.delete('/delete/:id', (req, res) => {


    const { id } = req.params;

    TodoModel.findByIdAndDelete(id)                         //delete  mongodb cmd
    
        .then(deletedTodo => {

            if (!deletedTodo) {                                                
                return res.status(404).json({ error: 'Todo not found' });
            }


            res.json({ message: 'Todo deleted successfully', deletedTodo });             //delete todo
        })


        .catch(err => res.status(500).json({ error: 'Delete failed', details: err.message }));
});






app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);                //port listen dynamic
});
