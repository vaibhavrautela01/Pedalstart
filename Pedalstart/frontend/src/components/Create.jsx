import React, { useState } from 'react';

function Create({ addNewTask }) {  

  const [title, setTitle] = useState('');


  const [description, setDescription] = useState('');


  const [date, setDate] = useState('');



  const handleSubmit = async (e) => {

    e.preventDefault();

    const task = { title, description, date };


    try {


      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
                                                                                //try catch

      const data = await response.json();
      console.log('Task created:', data);


      addNewTask(); 
      setTitle(''); 
      setDescription('');
      setDate('');


    } 
    
    
    
    catch (error) {
      console.error('Error creating task:', error);
    }


  };

  return (
    <form onSubmit={handleSubmit}>


      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title" class="v"
      />

      <input
        type="text"
        value={description}                                                             //input type with value,type, placeholder && onchange for action
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description" class="v"
      />


      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"class="v"
      /><br></br>


      <button type="submit" id="p">Add Task</button>


    </form>
  );
}

export default Create;          //export
