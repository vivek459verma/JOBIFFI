import "./App.css";
import { getServerResponse } from "./api/serverApi";
import { useState, useEffect } from "react";
import Login from "./components/login"; // <--- Import the Login Popup

function App() {
  // 1. State for Server Message
  const [message, setMessage] = useState("Loading...");
  
  // 2. State for Login Popup
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServerResponse();
      setMessage(data || "Failed to connect to server");
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Jobiffi</h1>
        
        {/* LOGIN BUTTON */}
        <button 
          onClick={() => setIsLoginOpen(true)} // Opens the popup
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </nav>

      {/* --- MAIN CONTENT (Your existing server check) --- */}
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-2">Server Status:</p>
          <h1 className="text-2xl font-bold text-green-600">
            {message}
          </h1>
        </div>
      </div>

      {/* --- LOGIN POPUP --- */}
      {/* This sits on top of everything when isOpen is true */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

    </div>
  );
}

export default App;