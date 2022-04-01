import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import db from "./firebase";
import { FormControl, Input, IconButton } from "@material-ui/core";
import { Send, EmojiEmotions } from "@material-ui/icons";
import EmojiPicker from "emoji-picker-react";
import { Loading } from "react-loading-dot";
import Messages from "./components/Messages";
import "./css/app.css";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiVisisble, setEmojiVisible] = useState(false);

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
      const user = prompt(message || "Enter your username").trim();
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

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject.emoji);
  };

  return (
    <div className="app">
      <img className="app__logo" src="images/logo.png" alt="Messenger logo" />

      {isLoading ? (
        <Loading />
      ) : (
        <Messages messages={messages} username={username} />
      )}

      {isEmojiVisisble && <EmojiPicker onEmojiClick={onEmojiClick} />}

      <form className="app__form">
        <FormControl className="app__form-control">
          <Input
            type="text"
            value={input}
            autoFocus
            placeholder="Send a message..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </FormControl>

        <IconButton
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendMessage}
        >
          <Send />
        </IconButton>

        <IconButton
          variant="contained"
          onClick={() => setEmojiVisible(!isEmojiVisisble)}
        >
          <EmojiEmotions />
        </IconButton>
      </form>
    </div>
  );
};

export default App;
