# Task Management System (Frontend)

A high-performance, scalable task management interface built with **React** and **Vite**. This project focuses on handling complex user inputs, data validation, and responsive detailed views with a modern tech stack.

---

## 🚀 Key Features

### **Task A: "Create Task" Modal**
- Optimized form handling for creating new tasks.
- Dedicated fields for **Title**, **Description**, **Priority** (Low/Medium/High), and **Due Date**.
- Seamless integration with parent state for real-time dashboard updates.

### **Task B: Detailed Task View & Engagement**
- Dynamic **Task Detail Modal/Slide-over** for focused information retrieval.
- Integrated **Comment Section** with local state management for user communication.
- Comprehensive task management actions (Close/Delete).

### **Task C: Robust Client-side Validation**
- Implementation of **Schema-based validation** for high data integrity.
- **Constraints Applied:**
  - `Title`: Required (min 1 character).
  - `Description`: Required (min 5 characters).
  - `Due Date`: Prevention of past-date entry (Validation: `Date >= Today`).
  - `Priority`: Enum-based strict validation.

---

## 🛠 Tech Stack & Tools

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [React](https://reactjs.org/) (Vite-powered) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (PostCSS configuration) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/) |
| **Schema Validation** | [Zod](https://zod.dev/) |
| **API Client** | [Axios](https://axios-http.com/) (Ready for Backend Integration) |

---

## 🏗 Architecture & Best Practices

- **Component-based Modular Design**: Highly decoupled components (`TaskCard`, `TaskModal`, `CommentSection`) for maximum reusability.
- **SOLID Principles**: Adhering to Single Responsibility Principle (SRP) by separating validation logic (`schemas/`), utility functions (`utils/`), and UI components.
- **Schema-Driven Development**: Centralized validation rules in `src/schemas/` to ensure consistency across the application.
- **Simulated Realism**: Currently utilizing optimized **dummy data** and loading states to mimic a real-world asynchronous environment while backend APIs are under development.

---

## 📅 Roadmap / Next Steps
- Transition from local state to **Axios-based API calls** once backend endpoints are finalized.
- Implementation of Global State Management (e.g., Zustand or Context API) for broader access.
- Enhanced animations for modal transitions and task filtering.
