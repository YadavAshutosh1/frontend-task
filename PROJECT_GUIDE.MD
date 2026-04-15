## 🔹 1. Project Overview

This is a Task Management System built using React. It allows users to create, view, filter, and delete tasks. The application follows a component-based architecture and uses modern React practices like hooks and functional programming methods.

---

## 🔹 2. Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **State Management:** useState, useEffect
* **Form Handling:** react-hook-form + Zod
* **API Handling:** Axios (API service)
* **Backend:** REST API / JSON Server

---

## 🔹 3. Core Features

* Create new tasks
* View all tasks
* Delete tasks
* Filter tasks by priority (High, Medium, Low)
* View task details in modal
* Loading and empty states handling

---

## 🔹 4. Application Architecture

### 📌 Main Components:

* **Dashboard**

  * Central controller (main state management)
* **TaskCard**

  * Displays individual task
* **TaskModal**

  * Form for creating new tasks
* **TaskDetailModal**

  * Displays selected task details and delete option

---

## 🔹 5. State Management (Single Source of Truth)

All task data is stored in the Dashboard component:

```js
const [tasks, setTasks] = useState([]);
```

This ensures:

* Centralized data control
* Predictable state updates
* Easier debugging

---

## 🔹 6. Data Fetching (useEffect)

```js
useEffect(() => {
  const fetchTasks = async () => {
    const res = await API.get("/tasks");

    const data = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    setTasks(data);
    setLoading(false);
  };

  fetchTasks();
}, []);
```

### Key Points:

* Runs on component mount
* Handles inconsistent API responses
* Updates loading state

---

## 🔹 7. Add Task Logic

```js
setTasks((prev) => [...prev, task]);
```

* Uses spread operator
* Maintains immutability
* Avoids direct mutation

---

## 🔹 8. Delete Task Logic (FILTER)

```js
setTasks((prev) => prev.filter((t) => t._id !== id));
```

### Explanation:

* Removes the selected task
* Keeps remaining tasks unchanged
* Returns a new array

---

## 🔹 9. Filter Logic (Priority Based)

```js
const filteredTasks =
  filter === "all"
    ? tasks
    : tasks.filter((task) => task.priority === filter);
```

* Dynamically filters tasks
* Improves user experience

---

## 🔹 10. Rendering Tasks (MAP)

```js
filteredTasks.map((task) => (
  <TaskCard key={task._id || task.id} task={task} />
));
```

### Explanation:

* Iterates through tasks
* Dynamically creates UI components
* Uses safe keys for React optimization

---

## 🔹 11. Modal Handling (Conditional Rendering)

```js
{open && <TaskModal />}
{selectedTask && <TaskDetailModal />}
```

* Controls visibility of modals
* Keeps UI clean and dynamic

---

## 🔹 12. TaskCard Component

* Displays task title, description, priority, and due date
* Uses helper functions:

  * `formatDate()` for date formatting
  * `getPriorityColor()` for dynamic styling
* Sends selected task back to parent on click

---

## 🔹 13. Helper Functions

### formatDate()

* Converts raw date into readable format

### getPriorityColor()

* Returns CSS class based on priority:

  * High → Red
  * Medium → Yellow
  * Low → Green

---

## 🔹 14. Key Concepts Used

* Lifting State Up
* Functional Programming (map, filter)
* Immutability
* Component Reusability
* Separation of Concerns
* Conditional Rendering

---

## 🔹 15. Error Handling

* API errors handled using try-catch
* Console logging for debugging
* Safe checks (if (!task), if (!id))

---

## 🔹 16. UX Improvements

* Loading state display
* Empty state message
* Auto-close modal after delete
* Smooth UI transitions

---

## 🔹 17. Future Improvements

* Add Edit Task functionality
* Add authentication (login/signup)
* Use Context API / Redux for scaling
* Add search functionality
* Pagination for large data

---

## 🔹 18. Conclusion

This project demonstrates a strong understanding of React fundamentals, including state management, component structure, and functional programming techniques. It follows best practices like immutability and modular design, making it scalable and maintainable.


