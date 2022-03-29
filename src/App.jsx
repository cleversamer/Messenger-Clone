import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
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
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendMessage}
        >
          Send Message
        </Button>
      </form>

      {/* messages */}
    </div>
  );
};

export default App;
