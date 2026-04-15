import { formatDate, getPriorityColor, isTaskExpired, getTimeRemaining } from "../utils/helpers";

const TaskCard = ({ task, onClick, onEdit }) => {
  const expired = isTaskExpired(task._id);
  const timeRemaining = getTimeRemaining(task._id);

  return (
    <div
      onClick={() => onClick(task)}
      className={`bg-white p-5 rounded-xl shadow hover:shadow-xl transition duration-300 cursor-pointer relative ${
        expired ? "opacity-60 grayscale" : ""
      }`}
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
      <div className="flex justify-between items-center mt-2">
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            expired ? "bg-red-100 text-red-600" : getPriorityColor(task.priority)
          }`}
        >
          {expired ? "EXPIRED" : task.priority?.toUpperCase()}
        </span>

        <span className="text-sm text-gray-500 flex flex-col items-end">
          <span>{formatDate(task.dueDate)}</span>
          {timeRemaining && (
            <span className={`text-xs mt-1 font-semibold ${expired ? "text-red-500" : "text-blue-500"}`}>
              {timeRemaining}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;