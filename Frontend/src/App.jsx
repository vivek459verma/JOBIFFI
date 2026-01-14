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
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
