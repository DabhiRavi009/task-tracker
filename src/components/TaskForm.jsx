import React, { useEffect, useState } from "react";
import toDo from "../assestes/images/to-do.png";
import pagePen from "../assestes/images/page-pen.png";
import "../App.css";

export const TaskForm = () => {

  const getLocalItem = () => {
    let task = localStorage.getItem("task");
    if (task) {
      return JSON.parse(localStorage.getItem("task"));
    }else{
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [task, setTask] = useState(getLocalItem());
  const [toggle, setToggle] = useState(true);
  const [isEditTask, setIsEditTask] = useState("");


  const addTask = () => {
    if (!inputData) {
      alert("Please Add Task First");
    } else if (inputData && !toggle) {
      setTask(
        task.map((element) => {
          if (element.id === isEditTask) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setToggle(true);
      setInputData("");
      setIsEditTask(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setTask([...task, allInputData]);
      setInputData("");
    }
  };

  const deleteTask = (id) => {
    const updatedItem = task.filter((curElm) => {
      return curElm.id !== id;
    });
    setTask(updatedItem);
  };

  const removeAll = () => {
    setTask([]);
  };

  const editTask = (id) => {
    let newEditTask = task.find((task) => {
      return task.id === id;
    });
    setToggle(false);
    setInputData(newEditTask.name);
    setIsEditTask(id);
  };

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);
  return (
    <>
      <div className="taskform-container">
        <img src={toDo} alt="task-tracker" />
        <h1>Add Your Task Here...</h1>
        <div className="input-container">
          <img src={pagePen} alt="icon" className="icon" />
          <input
            type="text"
            placeholder="Add Task..."
            className="input-field"
            name="task"
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />
          {toggle ? (
            <i className="fa-solid fa-plus add-icon" onClick={addTask}></i>
          ) : (
            <i
              className="fa-solid fa-pen-to-square edit-icon"
              onClick={addTask}
            ></i>
          )}
        </div>
        <div className="task-container">
          {task.map((task) => {
            return (
              <div className="task" key={task.id}>
                <div className="para-container">
                  <p>{task.name}</p>
                </div>
                <div className="icon-container">
                  <i
                    className="fa-solid fa-pen-to-square edit-icon"
                    onClick={() => {
                      editTask(task.id);
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-trash-can delete-icon"
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="button-container">
          <button className="btn" onClick={removeAll}>
            <span>Remove All</span>
          </button>
        </div>
      </div>
    </>
  );
};
