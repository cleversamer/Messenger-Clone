import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import db from "./firebase";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Messages from "./components/Messages";
import "./css/app.css";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your username").substring(0, 16));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="app">
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

      <Messages messages={messages} username={username} />
    </div>
  );
};

export default App;
