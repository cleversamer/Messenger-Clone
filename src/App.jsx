import React, { useState } from "react";
import "./css/app.css";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(["Hey Guys!"]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="app">
      <h1>Hello World!</h1>

      <form>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        <button type="submit" onClick={sendMessage}>
          Send Message
        </button>
      </form>

      {/* messages */}
    </div>
  );
};

export default App;
