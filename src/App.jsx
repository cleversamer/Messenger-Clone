import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Message from "./components/Message";
import "./css/app.css";

let lastId = 1;

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Enter your username").substring(0, 16));
    setMessages([
      { id: lastId++, username: "Samer", text: "Hey guys!!!" },
      { id: lastId++, username: "Sonny", text: "Hellooooo" },
      { id: lastId++, username: "Qazi", text: "This is a Messenger Clone" },
    ]);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { id: lastId++, username, text: input }]);
    setInput("");
  };

  return (
    <div className="app">
      <h1>Hello {username}</h1>

      <form>
        <FormControl>
          <InputLabel>Send a message...</InputLabel>

          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>

      {messages.map((message) => (
        <Message key={message.id} username={username} message={message} />
      ))}
    </div>
  );
};

export default App;
