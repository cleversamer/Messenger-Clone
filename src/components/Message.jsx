import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../css/message.css";

const Message = ({ username, message }) => {
  const isUser = username === message.username;

  const getMessageClasses = () => {
    return `message ${isUser && "message-user"}`;
  };

  const getCardClasses = () => {
    const type = `message__${isUser ? "user-card" : "guest-card"}`;
    return `message__card ${type}`;
  };

  return (
    <div className={getMessageClasses()}>
      <Card className={getCardClasses()}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message.username}: {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
