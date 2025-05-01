import { useDrag, useDrop } from "react-dnd";
import Action from "./Action";

const columnStyles = {
  Todo: "bg-blue-100 text-blue-800 border-blue-300",
  "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-300",
  Done: "bg-green-100 text-green-800 border-green-300",
};

function Layout(props) {
  const { level, getTasksByPriority, moveTaskToNewPriority } = props;

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.priority !== level) {
        moveTaskToNewPriority(item.task, level);  // Move the task to the new column
      }
    },
  });

  return (
    <div
      ref={drop}
      className={`w-full p-4 rounded-lg shadow-md ${columnStyles[level]} border-l-8 border-opacity-75`}
    >
      <h2 className="text-2xl font-semibold text-center mb-6">{level}</h2>
      <div className="space-y-4">
        {getTasksByPriority(level).map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            level={level}
            handleEditTask={props.handleEditTask}
            handleChangePriority={props.handleChangePriority}
            handleDeleteTask={props.handleDeleteTask}
            setSelectedTask={props.setSelectedTask}
            selectedTask={props.selectedTask}
            moveTaskToNewPriority={moveTaskToNewPriority}
          />
        ))}
      </div>
    </div>
  );
}

function TaskItem({
  task,
  level,
  handleEditTask,
  handleChangePriority,
  handleDeleteTask,
  setSelectedTask,
  selectedTask,
  moveTaskToNewPriority,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task, priority: level },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
    >
      <p
        className="text-lg font-medium text-gray-800 mb-2"
        onClick={() => setSelectedTask(task)}
      >
        {task.text}
      </p>
      {selectedTask === task && (
        <Action
          priority={level}
          handleEditTask={handleEditTask}
          handleChangePriority={handleChangePriority}
          handleDeleteTask={handleDeleteTask}
          selectedTask={selectedTask}
        />
      )}
    </div>
  );
}

export default Layout;
