import React from "react";
import Message from "./Message";
import "../css/messages.css";

const Messages = ({ messages, username }) => {
  return (
    <div className="messages-container">
      {messages.map((message) => (
        <Message key={message.id} username={username} message={message} />
      ))}
    </div>
  );
};

export default Messages;
