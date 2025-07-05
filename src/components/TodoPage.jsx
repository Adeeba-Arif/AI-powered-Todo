import React, { useState } from 'react';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core"; 

const TodoPage = () => {
  const [userData, setUserData] = useState({
    todos: [],
    input: '',
  });

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(userData)
  });

  useCopilotAction({
    name: "addTask",
    description: "Adds a task to the todo list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
    ],
    handler: ({ title }) => {
      addTodo(title);
    },
  });

  const handleChange = (event) => {
    setUserData(prev => ({
      ...prev,
      input: event.target.value
    }));
  };

  const addTodo = (title) => {
    setUserData(prev => {
      const taskTitle = (title || prev.input).trim();
      if (!taskTitle) return prev; 
      
      return {
        ...prev,
        todos: [...prev.todos, taskTitle],
        input: '',
      };
    });
  };
  useCopilotAction({
    name: "deleteTask",
    description: "Deletes a task from the todo list",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the task",
        required: true,
      },
    ],
    handler: ({ id }) => {
      deleteTodo(id);
    },
  });
 
  // useCopilotAction({
  //   name: "setTaskStatus",
  //   description: "Sets the status of a task",
  //   parameters: [
  //     {
  //       name: "id",
  //       type: "number",
  //       description: "The id of the task",
  //       required: true,
  //     },
  //     {
  //       name: "status",
  //       type: "string",
  //       description: "The status of the task",
  //       enum: Object.values(TaskStatus),
  //       required: true,
  //     },
  //   ],
  //   handler: ({ id, status }) => {
  //     setTaskStatus(id, status);
  //   },
  // });
  const deleteTodo = (index) => {
    setUserData(prev => ({
      ...prev,
      todos: prev.todos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 bg-white bg-opacity-80 shadow-lg rounded-lg w-96">
        <h1 className="text-3xl font-semibold text-blue-600 mb-5">To-Do List</h1>

        <div className="flex flex-col w-full mb-4">
          <input
            value={userData.input}
            onChange={handleChange}
            type="text"
            placeholder="Enter your task"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()} // Add task on Enter key
          />
          <button
            onClick={() => addTodo()} // Explicitly call with no arguments
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col mt-5 w-full">
          <ul className="list-disc list-inside">
            {userData.todos.map((todo, index) => (
              <li key={index} className="flex justify-between items-center p-2 border-b border-gray-300">
                {todo}
                <button
                  onClick={() => deleteTodo(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;