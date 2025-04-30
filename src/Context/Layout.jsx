import React from "react";
import Action from "./Action";

function Layout(props) {
  const getColumnStyle = (level) => {
    switch (level) {
      case "Todo":
        return {
          bg: "bg-blue-100",
          header: "text-blue-700 border-blue-300",
        };
      case "In Progress":
        return {
          bg: "bg-yellow-100",
          header: "text-yellow-700 border-yellow-300",
        };
      case "Done":
        return {
          bg: "bg-green-100",
          header: "text-green-700 border-green-300",
        };
      default:
        return {
          bg: "bg-gray-100",
          header: "text-gray-700 border-gray-300",
        };
    }
  };

  const styles = getColumnStyle(props.level);

  return (
    <div className={`w-80 flex-shrink-0 rounded-md shadow-md border ${styles.header} p-4 ${styles.bg}`}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${styles.header}`}>
        {props.level}
      </h2>
      <div className="space-y-3">
        {props.getTasksByPriority(props.level).map((task, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded shadow hover:shadow-lg transition"
          >
            <p
              className="text-base cursor-pointer font-medium text-gray-800"
              onClick={() => props.setSelectedTask(task)}
            >
              {task.text}
            </p>
            {props.selectedTask === task && (
              <Action
                priority={props.level}
                handleEditTask={props.handleEditTask}
                handleChangePriority={props.handleChangePriority}
                handleDeleteTask={props.handleDeleteTask}
                selectedTask={props.selectedTask}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Layout;
