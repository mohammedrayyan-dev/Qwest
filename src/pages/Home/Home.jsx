import { useState } from "react";
import "./Home.css";
import QwestLogo from "/src/assets/QwestLogo.png";
import { 
  Calendar,
  CalendarClock, 
  CalendarCheck, 
  ListCheck,
  Clock, 
  ClipboardList, 
  LogOut} from "lucide-react";
import { logout } from "../../firebase";
import { toast } from "react-toastify";

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [activeTab, setActiveTab] = useState("tasks");

  const [filter, setFilter] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tempTask, setTempTask] = useState({
    text: "",
    date: "",
    time: "",
    priority: "",
  });

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setTempTask({
      text: task.text,
      date: task.date,
      time: task.time,
      priority: task.priority,
    });
  }

  const handleSave = (id) => {
    if (tempTask.text.trim() === "") { 
      return toast.error("Task cannot be empty!", { autoClose: 2000, pauseOnHover: false }
      )}; 
    setTasks((prev) => 
      prev.map((task) => task.id === id ? { ...task, ...tempTask } : task))
    setEditingTaskId(null);
  }

  const handleCancel = () => {
    setEditingTaskId(null);
  }

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  console.log("handleInputChange:", name, value);
  setTempTask((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const addTask = () => {
    if (taskText.trim() === "") { 
      return toast.error("Task cannot be empty!", { autoClose: 2000, pauseOnHover: false }
      )};

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

  const tabs = [
    { key: "tasks", label: "Tasks", icon: ClipboardList },
    { key: "today", label: "Today", icon: CalendarClock },
    { key: "scheduled", label: "Scheduled", icon: CalendarCheck }, 
    { key: "completed", label: "Completed", icon: ListCheck },
  ]

  const activeTabLabel = tabs.find((tab) => tab.key === activeTab)?.label;

  const completedTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? {...t, completed: true} : t)));
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const priorityMap = { High: 3, Medium: 2, Low: 1 };

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toISOString().split("T")[0];
    switch (activeTab) {
      case "tasks":
        return !task.completed;
      case "today":
        return task.date === today && !task.completed;
      case "scheduled":
        return task.date > today && !task.completed;
      case "completed":
        return task.completed;
      default:
        return !task.completed;
    }
  }) 
  .sort((a, b) => {
    switch (filter) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "priority-asc":
        return priorityMap[a.priority] - priorityMap[b.priority];
      case "priority-desc":
        return priorityMap[b.priority] - priorityMap[a.priority];
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col sm:flex-row sm:h-screen">
      <div className="sm:w-[18%] transition-all duration-400  bg-gray-100 relative flex flex-col items-center shadow-sm sm:shadow-lg">
    <div className="flex items-center transition-all duration-400 mt-4 mb-5 text-left space-x-3">
      <img src={QwestLogo} alt="QwestLogo" className="w-4 h-4 sm:w-7 sm:h-7" />
      <h1 className="text-xl sm:text-3xl font-semibold text-[#111827]">Qwest</h1>
    </div>

    <div className="sm:mt-3 mb-4 sm:mb-0 transition-all duration-400 flex flex-row sm:flex-col space-x-2 mx-2 sm:mx-0 space-y-0 w-[340px] sm:w-[180px] overflow-x-scroll scrollbar-hide sm:space-x-0 sm:space-y-6">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return(
          <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`cursor-pointer flex items-center justify-center space-x-2 px-3 sm:px-6 py-1 sm:py-2 rounded-lg transition-colors duration-300
          ${activeTab === tab.key ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
        `}
          >
            <Icon className="w-3 sm:w-5" />
            <span className="text-sm font-medium sm:text-lg">{tab.label}</span>
          </button>
        )
      })}
    </div>
    <div className="absolute left-83 transition-all duration-400 sm:left-15 sm:bottom-6 space-y-5 ">
    <button
      onClick={() => {logout()}} 
      className="sm:cursor-pointer mt-4 sm:mt-3 bg-red-500 sm:hover:bg-red-600 w-8 h-8 sm:w-30 sm:h-11 flex items-center justify-center sm:space-x-2 font-semibold rounded-lg text-white transition-colors duration-300">
        <LogOut className="w-3 sm:w-5" />
        <span className="text-sm sm:text-lg hidden sm:block">Log Out</span>
      </button>
    <h3 className="hidden sm:block text-sm text-gray-500">
      © 2025 Qwest, Inc.
    </h3>
    </div>
    </div>

    <div className="w-[82%] transition-all duration-400  mx-4 sm:mx-8 mt-5">
      <div className="flex justify-between">
      <h3 className="text-xl sm:text-3xl font-semibold">
        {activeTabLabel}
      </h3>
      <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      class="w-44 sm:w-62 p-2 border border-gray-300 text-xs sm:text-lg rounded-lg focus:outline-none focus:border-[#D4AF37]">
        <option value="">Sort by</option>
        <option value="date-asc">Date: (Earliest → Latest)</option>
        <option value="date-desc">Date: (Latest → Earliest)</option>
        <option value="priority-desc">Priority: (High → Low)</option>
        <option value="priority-asc">Priority: (Low → High)</option>
      </select>
      </div>
  
      {activeTab !== "completed" && (
      <div key={tasks.id} className="mt-5 flex flex-col transition-all duration-400 sm:flex-row space-y-2 sm:space-y-0 space-x-3">
      <input 
      type="text"
      placeholder="Enter a task..."
      value={taskText}
      onChange={(e) => setTaskText(e.target.value)}
      class="w-87 sm:w-75 pl-4 py-2 sm:py-0 border border-gray-300 text-xs sm:text-lg rounded-lg focus:outline-none focus:border-[#D4AF37]"
      />
      <div class="flex space-x-3">
        <input 
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        class="px-8 sm:px-4 py-2 border border-gray-300 text-xs sm:text-lg rounded-lg focus:outline-none focus:border-[#D4AF37]"
        />
        <input 
        type="time"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        class="px-9 sm:px-4 py-2 border border-gray-300 text-xs sm:text-lg rounded-lg focus:outline-none focus:border-[#D4AF37]"
        />
      </div>
      <select
      value={taskPriority}
      onChange={(e) => setTaskPriority(e.target.value)}
      class="w-87 sm:w-35 p-2 border border-gray-300 text-xs sm:text-lg rounded-lg focus:outline-none focus:border-[#D4AF37]"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button 
      onClick={addTask} 
      class="bg-gradient-to-r from-[#D4AF37] to-[#facc15] hover:bg-[#1F2937] cursor-pointer py-2 sm:py-0 w-87 sm:w-35 text-xs sm:text-lg font-semibold rounded-lg text-white transition-colors duration-300">
        + Add Task
      </button>
      </div>
      )}

      {/* Task List */}
      <div class="mt-6 w-[350px] transition-all duration-400 sm:w-full max-w-8xl h-[340px] sm:h-[640px] space-y-3 overflow-y-auto">
        {filteredTasks.length === 0 ? (
        <p class="text-gray-500 text-sm sm:text-lg">No tasks here</p>
        ) : (
        filteredTasks.map((task) => (
          <div
          key={task.id}
          class="bg-white border border-gray-200 p-3 rounded-lg shadow-sm"
          >

            {/* Checkbox + Task details */}
            <div class="flex flex-col sm:flex-row items-center space-x-4">
              <div class="flex items-center flex-row sm:w-full space-x-2"> 
            {activeTab !== "completed" && (
            <input
            type="checkbox"
            onClick={() => completedTask(task.id)}
            class="bg-gray-100 appearance-none w-4 h-4 cursor-pointer rounded hover:bg-blue-100 transition-all duration-300 rounded border border-gray-300 checked:bg-blue-500 checked:border-blue-600"
            />
            )}
              {editingTaskId === task.id ? (
                <input
                type="text"
                name="text"
                value={tempTask.text}
                onChange={handleInputChange}
                className="border border-gray-300 text-sm sm:text-lg px-1 sm:px-2 py-1 rounded w-full focus:outline-none focus:border-[#D4AF37]"
                />
              ) : ( 
                <p class="text-gray-800 text-sm sm:text-lg font-extralightbold text-lg w-full">
                {task.text}
                </p>
                 )}
                </div>

            
            <div class="flex flex-col mt-2 sm:mt-0 sm:flex-row space-x-4 items-center">
              <div class="flex space-x-0 sm:space-x-4 flex-row">
              {editingTaskId === task.id ? (
                <input
                type="date"
                name="date"
                value={tempTask.date}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded w-full focus:outline-none focus:border-[#D4AF37]"
                />
              ) : ( 
                <p class="text-gray-600 space-x-2 flex items-center text-md">
                <Calendar class="w-3 sm:w-4"/>
                <span class="w-[100px] text-sm sm:text-lg ">
                {task.date || "No Date"}
                </span>
                </p>
                 )}

                 {editingTaskId === task.id ? (
                <input
                type="time"
                name="time"
                value={tempTask.time}
                onChange={handleInputChange}
                className="border border-gray-300 px-1 sm:px-2 py-1 rounded w-full focus:outline-none focus:border-[#D4AF37]"
                />
              ) : ( 
                <p class="text-gray-600 space-x-2 flex items-center text-md">
                <Clock class="w-3 sm:w-4"/>
                <span class="w-[70px] text-sm sm:text-lg">
                {task.time || "No Time"}
                </span>
                </p>
                 )}
                </div>

                 <div className="mt-2 sm:mt-0">
                 {editingTaskId === task.id ? (
                <select
                name="priority"
                value={tempTask.priority}
                onChange={handleInputChange}
                class="w-35 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              ) : ( 
                <span
            class={`px-1 py-1 sm:py-2 flex justify-center text-sm sm:text-lg items-center text-sm h-8 w-28 rounded-full ${
              task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
            }`}
            >
              {task.priority}
            </span>
                 )}
              </div>

              <div class="flex mt-4 sm:mt-0 flex-row space-x-2">
              {activeTab !== "completed" && (
              <>
              {editingTaskId === task.id ? (
              <>
              <button
              onClick={() => handleSave(task.id)}
              class="px-3 py-1 bg-emerald-500 border border-emerald-400 text-emerald-600 hover:bg-emerald-600 text-sm sm:text-lg text-white cursor-pointer rounded-md"
              >
                Save
              </button>
              <button
              onClick={handleCancel}
              class="px-3 py-1 bg-gray-500 border border-gray-300 text-gray-600 hover:bg-gray-600 text-sm sm:text-lg text-white cursor-pointer rounded-md"
              >
                Cancel
              </button>
              </>
              ) : (
              <button
              onClick={() => handleEditClick(task)}
              class="px-3 py-1 bg-blue-500 border border-blue-400 text-blue-600 hover:bg-blue-600 text-sm sm:text-lg text-white cursor-pointer rounded-md"
              >
                Edit
              </button>
              )}
              </>
              )}
              <button
              onClick={() => deleteTask(task.id)}
              class="px-3 py-1 bg-red-500 border border-red-400 text-red-600 hover:bg-red-600 0 text-sm sm:text-lg text-white cursor-pointer rounded-md"
              >
                Delete
              </button>
            </div>
            </div>

            </div>
          </div>
        )))}
      </div>
    </div>
    </div>
  )
}

export default Home