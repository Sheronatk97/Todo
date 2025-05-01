import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Layout from "./Layout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Todo");
  const [selectedTask, setSelectedTask] = useState(null);

  // UseEffect For StoredTasks in Local Storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTextInputChange = (event) => setTextInput(event.target.value);
  const handlePriorityChange = (event) => setSelectedPriority(event.target.value);

  const handleTaskSubmit = () => {
    if (textInput.trim() === "") return;
    const newTask = { text: textInput, priority: selectedPriority };
    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("Todo");
  };

  const getTasksByPriority = (priority) => tasks.filter((task) => task.priority === priority);

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const moveTaskToNewPriority = (task, newPriority) => {
    const updatedTasks = tasks.map((t) =>
      t === task ? { ...t, priority: newPriority } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="lg:flex grid gap-4 items-center font-main mb-6">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full lg:w-96 border rounded p-2 shadow-md focus:outline-none"
            placeholder="Enter task"
          />
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="w-full lg:w-48 border rounded p-2 shadow-md focus:outline-none"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            onClick={handleTaskSubmit}
            className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            moveTaskToNewPriority={moveTaskToNewPriority}
            level="Todo"
          />
          {/* In Progress Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            moveTaskToNewPriority={moveTaskToNewPriority}
            level="In Progress"
          />
          {/* Done Priority */}
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            moveTaskToNewPriority={moveTaskToNewPriority}
            level="Done"
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskDashboard;
