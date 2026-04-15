// src/components/TaskModal.jsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schemas/taskSchema";
import API from "../services/api";

const TaskModal = ({ onClose, addTask, editTask, selectedTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: selectedTask || {}
  });

  // ✅ Prefill form when editing
  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate?.split("T")[0] // date fix
      });
    }
  }, [selectedTask, reset]);

  // ✅ Submit (Create + Update)
  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (selectedTask) {
        // 🔥 UPDATE (Use PATCH instead of PUT)
        const res = await API.patch(`/tasks/${selectedTask._id}`, data);
        editTask(res.data.data);
      } else {
        // 🔥 CREATE (Use user._id as projectId)
        const res = await API.post("/tasks", {
          ...data,
          projectId: user._id || "anything"
        });
        addTask(res.data.data);
      }

      onClose();
    } catch (err) {
      console.log("FULL ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96">
        
        <h2 className="text-xl font-bold mb-4">
          {selectedTask ? "Update Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          {/* Title */}
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>

          {/* Priority */}
          <select {...register("priority")} className="w-full border p-2 rounded">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <p className="text-red-500 text-sm">{errors.priority?.message}</p>

          {/* Due Date */}
          <input
            type="date"
            {...register("dueDate")}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {selectedTask ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModal;