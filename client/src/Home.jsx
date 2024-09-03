import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        location.reload()
      })
      .catch((err) => console.log(err));
      }

  return (
    <div className="home">
      <h2> To Do List <i class="uil uil-clipboard-notes"></i></h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          // Corrected the arrow function to return the JSX element
          <div key={index} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? <i class="uil uil-check-circle"></i> 
              :
              <i class="uil uil-circle"></i>
              }
              <p className={todo.done ? "line_throungh" :"" }>  
              {todo.task}
              </p>
            </div>
            <i class="uil uil-trash-alt" onClick={() =>handleDelete(todo._id)}></i>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
