import { formatDate, getPriorityColor } from "../utils/helpers";

const TaskCard = ({ task, onClick, onEdit }) => {
  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition duration-300 cursor-pointer relative"
    >
      {/* 🔥 EDIT BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ❗ important (detail modal open na ho)
          onEdit(task);
        }}
        className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs hover:bg-yellow-500"
      >
        Edit
      </button>

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-2">{task.title}</h2>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-4">{task.description}</p>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority?.toUpperCase()}
        </span>

        <span className="text-sm text-gray-500">
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;