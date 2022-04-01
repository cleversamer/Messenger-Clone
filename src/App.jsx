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
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
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
      const user = prompt(message || "Enter your username");
      const condition = user && user.length >= 3 && user.length <= 16;
      return condition
        ? user
        : getUsernameInput("Username should be 3 to 16 characters");
    } catch (ex) {}
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

  return (
    <div className="app">
      <img
        className="app__logo"
        src="https://seeklogo.com/images/F/facebook-messenger-new-2020-logo-30E9B0E51B-seeklogo.com.png"
        alt="Messenger logo"
      />

      <Messages messages={messages} username={username} />

      <form className="app__form">
        <FormControl className="app__form-control">
          <InputLabel>Send a message...</InputLabel>

          <Input
            type="text"
            value={input}
            autoFocus
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendMessage}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default App;
