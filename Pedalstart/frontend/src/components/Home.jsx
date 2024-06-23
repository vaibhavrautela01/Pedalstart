import React, { useEffect, useState } from 'react';   //hooks

import Create from './Create';   //page import

import axios from 'axios';   // HTTP requests for back && front

import './Home.css';

function Index() {


    const [todos, setTodos] = useState([]);

    const [selectedTodo, setSelectedTodo] = useState(null);                 //useState for update in frontend during changing

    const [updateTitle, setUpdateTitle] = useState('');

    const [updateDescription, setUpdateDescription] = useState('');

    useEffect(() => {
        fetchTodos();               //useEffect
    }, []);



    const fetchTodos = () => {


        axios.get('http://localhost:3000/get')      //port


            .then(result => {
                setTodos(result.data);                  //Fetches all todos from the server.
            })

            .catch(err => {
                console.log(err);
            });
    };

    const fetchTodoById = (id) => {  //id=unique id


        axios.get(`http://localhost:3000/task/${id}`)     

            .then(result => {
                setSelectedTodo(result.data);       
                                                    //Fetches todoby id from the server.
                setUpdateTitle(result.data.title);

                setUpdateDescription(result.data.description);
            })

            .catch(err => {

                console.log(err);                 //err

            });
    };

    const handleTodoSelection = (todo) => {
        
        fetchTodoById(todo._id);
    };

    const handleUpdateTodo = () => {

        if (selectedTodo) {

            axios.put(`http://localhost:3000/update/${selectedTodo._id}`, {

                title: updateTitle,

                description: updateDescription, 

                date: selectedTodo.date, // Assuming date remains unchanged

                completed: selectedTodo.completed // Preserve the completed status
            })
                .then(response => {
                    setTodos(prevTodos =>

                        prevTodos.map(t =>

                            t._id === selectedTodo._id ? { ...t, title: updateTitle, description: updateDescription } : t
                        )
                    );

                    setSelectedTodo(null);
                    
                    setUpdateTitle('');

                    setUpdateDescription('');
                })

                .catch(err => {

                    console.log(err);
                });
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(response => {
                setTodos(prevTodos => prevTodos.filter(t => t._id !== id));
            })

            .catch(err => {
                console.log(err);
            });
    };




    const formatDate = (dateString) => {

        const options = { year: 'numeric', month: 'short', day: 'numeric' };                //want date string in short format like 00/00/0000

        return new Date(dateString).toLocaleDateString('en-US', options);
    };




    return (
        <div className="container">


            <div className='d'>
                <h2 id="a">List of Working..</h2>

                <Create addNewTask={fetchTodos} />     {/*imported value of create*/}


                <h4>View Details:</h4>
            </div>

            <div className='c'>
                {
                    todos.length === 0
                        ? 
                        <div><h5>No Record</h5></div>                   //if : else

                        : todos.map(todo => (
                            <div key={todo._id} className='checkbox'>        



                                <input                                  
                                    type="radio"                            //radio button functionality like (id, onchange)
                                    id={todo._id}
                                    name="selectedTodo"
                                    className="z"
                                    value={todo._id}
                                    checked={selectedTodo && selectedTodo._id === todo._id}  //matching
                                    onChange={() => handleTodoSelection(todo)}
                                />


                                <label htmlFor={todo._id} className={todo.completed ? 'strikethrough' : ''}>
                                    <div>Title: {todo.title}</div>
                                    <div>Description: {todo.description}</div>                          {/* title,description date as said in assignment      striketrough for cut */}
                                    <div>Date: {formatDate(todo.date)}</div>


                                    <input type='submit' value={"Delete"} id="i" onClick={() => handleDelete(todo._id)} />     {/*  delete button */}

                                    
                                </label>
                            </div>
                        ))
                }
            </div>


            {selectedTodo && (
                <div className='update-form'>
                    <h4>Update Task</h4>

                    <label>
                        Title:
                        <input type="text" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />     {/*buttons     with  useState*/}
                    </label>

                    <label>
                        Description:
                        <input type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                    </label>

                    <button onClick={handleUpdateTodo}>Update</button>


                    <button onClick={() => setSelectedTodo(null)}>Cancel</button>


                </div>
            )}
        </div>
    );
}

export default Index;
