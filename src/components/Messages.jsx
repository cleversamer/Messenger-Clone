import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "../css/messages.css";

const Messages = ({ messages, username }) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef) messagesRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.map((message) => (
        <Message key={message.id} username={username} message={message} />
      ))}

      <div ref={messagesRef} />
    </div>
  );
};

export default Messages;
