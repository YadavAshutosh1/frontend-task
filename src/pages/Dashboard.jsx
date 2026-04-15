import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import TaskDetailModal from "../components/TaskDetailModal";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTaskData, setEditTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Get logged in user info (memoized to avoid new object on every render)
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ ADD TASK
  const addTask = (task) => {
    if (!task) return;
    setTasks((prev) => [...prev, task]);
  };

  // ✅ UPDATE TASK
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    if (!id) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setSelectedTask(null);
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  // ✅ FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Logged in user's ID
        const currentUserId = user._id;

        const res = await API.get(`/projects/${currentUserId || "anything"}/tasks`);

        const allTasks = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        // 🔥 FILTER: Only show tasks created by this user
        const myTasks = allTasks.filter(task => task.createdBy === currentUserId);

        setTasks(myTasks);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) fetchTasks();
    else setLoading(false);
  }, [user._id]);

  // ✅ FILTER
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.priority === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with User Info & Logout */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-500 text-sm">Welcome, <span className="font-semibold text-blue-600">{user.name || "User"}</span> 👋</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition font-medium"
          >
            Logout
          </button>
        </div>

        {/* Filter + Create */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              setOpen(true);
              setEditTaskData(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Create Task
          </button>

          <select
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-lg font-semibold animate-pulse mt-10">Loading your tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl">No tasks yet 😔</p>
            <p className="mt-2 text-gray-400">Create your first task to get started! 🚀</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onClick={setSelectedTask}
                onEdit={setEditTaskData}
              />
            ))}
          </div>
        )}

        {/* CREATE + UPDATE MODAL */}
        {(open || editTaskData) && (
          <TaskModal
            onClose={() => {
              setOpen(false);
              setEditTaskData(null);
            }}
            addTask={addTask}
            editTask={updateTask}
            selectedTask={editTaskData}
          />
        )}

        {/* DETAIL MODAL */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;