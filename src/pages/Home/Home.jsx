import { useState } from "react";
import "./Home.css";
import QwestLogo from "/src/assets/QwestLogo.png";
import { 
  Calendar,
  CalendarClock, 
  CalendarCheck, 
  ListCheck,
  Clock, 
  ClipboardList } from "lucide-react";
  import { logout } from "../../firebase";
import { updateDoc } from "firebase/firestore";

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState("null")
  
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskPriority, setTaskPriority] = useState("Priority");
  const [activeTab, setActiveTab] = useState("overview");

  const addTask = () => {
    if(taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      date: taskDate,
      time: taskTime,
      priority: taskPriority,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTaskText("");
    setTaskDate("");
    setTaskTime("");
    setTaskPriority("Medium");
  }

  const tabTitles = {
    overview: "All Tasks",
    today: "Today",
    scheduled: "Scheduled Tasks",
    completed: "Completed"
  }

  const completedTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? {...t, completed: true} : t)));
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if(activeTab === "overview"){
      return tasks && !task.completed;
    }

    if(activeTab === "today"){
      const today = new Date().toISOString().split("T")[0];
      return task.date === today && !task.completed;
    }

    if(activeTab === "scheduled"){
      const today = new Date().toISOString().split("T")[0];
      return task.date > today && !task.completed;
    }

    if(activeTab === "completed"){
      return task.completed;
    }
  })

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setTaskText(task.text);
    setTaskDate(task.date);
    setTaskTime(task.time);
    setTaskPriority(task.priority);
  }

  const handleSaveEdit = async (id) => {
    const taskRef = doc(db, "tasks", id)
    await updateDoc(taskRef, {
      text: taskText,
      date: taskDate,
      time: taskTime,
      priority: taskPriority
    });

    setEditingTaskId("null");
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
    setTaskPriority("");
  }

  const handleCancelEdit = () => {
    setEditingTaskId("null");
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
    setTaskPriority("");
  }

  return (
    <div class="flex h-screen">
      <div class="w-[18%] relative flex flex-col items-center shadow-lg">
    <div class="flex items-center mt-4 mb-5 text-left space-x-3">
      <img src={QwestLogo} alt="QwestLogo" class="w-7 h-7" />
      <h1 class="text-3xl font-semibold text-[#111827]">Qwest</h1>
    </div>

    <div class=" mt-3 flex flex-col space-y-6">
      <button 
      onClick={() => setActiveTab("overview")}
      class={`bg-[#D1D5DB] transition-colors duration-300 cursor-pointer w-45 h-11 rounded-lg flex items-center space-x-2 justify-center
      ${activeTab === "overview"
        ? "bg-[#D4AF37] text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}>
        <ClipboardList class="w-5" /> 
        <span class="text-lg font-medium">Overview</span>
      </button>
      <button 
      onClick={() => setActiveTab("today")}
      class={`bg-[#D1D5DB] transition-colors duration-300 cursor-pointer w-45 h-11 rounded-lg flex items-center space-x-2 justify-center
      ${activeTab === "today"
        ? "bg-[#D4AF37] text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}>
        <CalendarClock class="w-5" /> 
        <span class="text-lg font-medium">Today</span>
      </button>
      <button 
      onClick={() => setActiveTab("scheduled")}
      Class={`bg-[#D1D5DB] transition-colors duration-300 cursor-pointer w-45 h-11 rounded-lg flex items-center space-x-2 justify-center
      ${activeTab === "scheduled"
        ? "bg-[#D4AF37] text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}>
        <CalendarCheck class="w-5" /> 
        <span class="text-lg font-medium">Scheduled</span>
      </button>
      <button 
      onClick={() => setActiveTab("completed")}
      class={`bg-[#D1D5DB] transition-colors duration-300 cursor-pointer w-45 h-11 rounded-lg flex items-center space-x-2 justify-center
      ${activeTab === "completed"
        ? "bg-[#D4AF37] text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}>
        <ListCheck class="w-5" /> 
        <span class="text-lg font-medium">Completed</span>
      </button>
    </div>
    <h3 class="absolute position bottom-6 text-sm left-14 text-gray-500">
      © 2025 Qwest, Inc.
    </h3>
    </div>

    <div class="w-[82%]">
      <div class="bg-white m-2 h-200 shadow-md rounded-lg">
      <div class="flex justify-between">
      <h3 class="ml-12 mt-15 text-3xl font-semibold">
        {tabTitles[activeTab]}
      </h3>
      <button
      onClick={() => {logout()}} 
      class="mt-3 mr-3 bg-red-400 hover:bg-red-600 w-40 h-11 font-semibold rounded-lg text-white transition-colors duration-300">
        Log Out
      </button>
      </div>
  
      {activeTab !== "completed" && (
      <div class="mt-5 flex space-x-3 h-12">
      <input 
      type="text"
      placeholder="Enter a task..."
      value={taskText}
      onChange={(e) => setTaskText(e.target.value)}
      class="ml-12 w-75 pl-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex space-x-3">
        <input 
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input 
        type="time"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <select
      value={taskPriority}
      onChange={(e) => setTaskPriority(e.target.value)}
      class="w-54 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option disabled hidden>Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button 
      onClick={addTask} 
      class="bg-[#374151] hover:bg-[#1F2937] w-35 font-semibold rounded-lg text-white transition-colors duration-300">
        + Add Task
      </button>
      </div>
      )}

      {/* Task List */}
      <div class="mt-6 ml-12 w-full max-w-5xl space-y-3">
        {filteredTasks.length === 0 ? (
        <p class="text-gray-500">No tasks here</p>
        ) : (
        filteredTasks.map((task) => (
          <div
          key={task.id}
          class="bg-white border border-gray-200 p-3 rounded-lg shadow-sm"
          >
            <div class="flex items-center pl-2 space-x-4">
            {activeTab !== "completed" && (
            <input
            type="checkbox"
            onClick={() => completedTask(task.id)}
            class="bg-gray-100 appearance-none px-2 py-2 cursor-pointer rounded hover:bg-blue-100 transition-all duration-300 rounded border border-gray-300 checked:bg-blue-500 checked:border-blue-600"
            />
            )}
            <p class="text-gray-800 ml-0 font-extralightbold text-lg w-full">
              {task.text}
            </p>
            <div class="flex flex-cols items-center w-full">
            <p class="text-gray-600 space-x-1 flex w-full text-md">
            <Calendar class="w-4"/>
            <span>{task.date || "No date"}</span>
            </p>
            <p class="text-gray-600 ] space-x-1 flex w-full text-md">
            <Clock class="w-4"/>
            <span>{task.time || "No Time"}</span>
            </p>
            </div>
            <span
            class={`px-1 py-2 flex justify-center items-center text-sm w-150 rounded-full ${
              task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
            }`}
            >
              {task.priority}
            </span>
            <div class="flex space-x-4">
              {activeTab !== "completed" && (
              <>
              <button
              onClick={() => startEditing(task.id)}
              class="px-3 py-1 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
              onClick={() => handleSaveEdit(task)}
              class="px-3 py-1 bg-green-500 text-white cursor-pointer rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
              onClick={() => handleCancelEdit(task.id)}
              class="px-3 py-1 bg-gray-500 text-white cursor-pointer rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              </>
              )}
              <button
              onClick={() => deleteTask(task.id)}
              class="px-3 py-1 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            </div>
          </div>
        )))}
      </div>
    </div>
    </div>
    </div>
  )
}

export default Home