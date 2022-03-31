import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import db from "./firebase";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { Loading } from "react-loading-dot";
import Messages from "./components/Messages";
import "./css/app.css";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      db.collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoading(false);
        });
    } catch (ex) {}
  }, []);

  useEffect(() => {
    try {
      setUsername(getUsernameInput());
    } catch (ex) {}
  }, []);

  const getUsernameInput = (message) => {
    try {
      const user = prompt(message || "Enter your username").substring(0, 16);
      const condition = user.length >= 3 && user.length <= 16;
      if (!condition)
        return getUsernameInput("Username should be 3 to 16 characters");

      return user;
    } catch (ex) {
      return getUsernameInput("Please enter a username");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    try {
      db.collection("messages").add({
        message: input,
        username,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    } catch (ex) {}

    setInput("");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="app">
      <Messages messages={messages} username={username} />

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
            Send
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default App;
