const mongoose = require('mongoose');



const TodoSchema = new mongoose.Schema({
    title: String,                                                //value you want to add in schema
    description: String,
    date: Date,
    completed: { type: Boolean, default: false },        //by default value false so that we can make true
});



const TodoModel = mongoose.model('taskmanager', TodoSchema);   //db collections    //pass the todoschema

module.exports = TodoModel; //export 
