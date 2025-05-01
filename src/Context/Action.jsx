import React from "react";

const Action = ({
  selectedTask,
  priority,
  handleEditTask,
  handleChangePriority,
  handleDeleteTask,
}) => {
  const onEdit = () => {
    const newText = prompt("Edit task:", selectedTask.text);
    if (newText && newText !== selectedTask.text) {
      handleEditTask({ ...selectedTask, text: newText });
    }
  };

  const onChangePriority = () => {
    const newPriority = prompt("Enter new priority (High, Medium, Low):", selectedTask.priority);
    if (newPriority && newPriority !== selectedTask.priority) {
      handleChangePriority({ ...selectedTask, priority: newPriority });
    }
  };

  const onDelete = () => {
    if (window.confirm(`Are you sure you want to delete this ${priority} priority task?`)) {
      handleDeleteTask(selectedTask);
    }
  };

  return (
    <div className="mt-2 space-x-2 flex justify-center">
      <button
        onClick={onEdit}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg transition"
      >
        Edit
      </button>
      <button
        onClick={onChangePriority}
        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-lg transition"
      >
        Change Priority
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  );
};

export default Action;
