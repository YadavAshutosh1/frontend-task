// src/components/TaskModal.jsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schemas/taskSchema";
import API from "../services/api";
import { setExpiryForTask, getExpiryData } from "../utils/helpers";

const TaskModal = ({ onClose, addTask, editTask, selectedTask }) => {
  console.log("TASK MODAL LOADED V2");
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
      const expiryData = getExpiryData();
      const currentExpiry = expiryData[selectedTask._id];

      reset({
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate?.split("T")[0], // date fix
        expiryDuration: currentExpiry?.duration || ""
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
        const updatedTask = res.data.data;
        
        // Reset expiry timer on edit as requested
        if (data.expiryDuration) {
          setExpiryForTask(updatedTask._id, data.expiryDuration);
        }
        
        editTask(updatedTask);
      } else {
        // 🔥 CREATE (Use user._id as projectId)
        const res = await API.post("/tasks", {
          ...data,
          projectId: user._id || "anything"
        });
        const newTask = res.data.data;

        // Save expiry duration to localStorage
        if (data.expiryDuration) {
          setExpiryForTask(newTask._id, data.expiryDuration);
        }

        addTask(newTask);
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
          {selectedTask ? "Update Task (With Expiry)" : "Create Task (With Expiry)"}
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

          {/* Expiry Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Expiry Duration
            </label>
            <select 
              {...register("expiryDuration")} 
              className="w-full border p-2 rounded bg-white outline-blue-500"
            >
              <option value="">-- Select Duration --</option>
              <option value="5m">5 Minutes</option>
              <option value="15m">15 Minutes</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="2h">2 Hours</option>
              <option value="1d">1 Day</option>
            </select>
            <p className="text-red-500 text-xs mt-1">{errors.expiryDuration?.message}</p>
          </div>

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