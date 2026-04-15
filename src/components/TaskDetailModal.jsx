import CommentSection from "./CommentSection";
import { formatDate, getPriorityColor } from "../utils/helpers";

const TaskDetailModal = ({ task, onClose, deleteTask }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px]">

        <h2 className="text-xl font-bold mb-2">{task.title}</h2>

        <p className="text-gray-600 mb-4">{task.description}</p>

        <div className="flex justify-between mb-4">
          <span className={`${getPriorityColor(task.priority)} font-semibold`}>
            {task.priority.toUpperCase()}
          </span>

          <span className="text-sm text-gray-500">
            {formatDate(task.dueDate)}
          </span>
        </div>

        {/* Comments */}
        <CommentSection />

        {/* Delete Button */}
        <button
          onClick={() => {
            deleteTask(task._id);
            onClose();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded w-full mt-3"
        >
          Delete Task
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-2 bg-gray-300 px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetailModal;