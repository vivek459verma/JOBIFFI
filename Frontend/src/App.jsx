import "./App.css";
import { getServerResponse } from "./api/serverApi";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServerResponse();
      setMessage(data || "Failed to connect to server");
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          {message}
        </h1>
      </div>
    </div>
  );
}

export default App;
