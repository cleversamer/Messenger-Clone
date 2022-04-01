import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../css/message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  const getMessageClasses = () => {
    return `message ${isUser && "message-user"}`;
  };

  const getCardClasses = () => {
    const type = `message__${isUser ? "user-card" : "guest-card"}`;
    return `message__card ${type}`;
  };

  return (
    <div ref={ref} className={getMessageClasses()}>
      <Card className={getCardClasses()}>
        <CardContent>
          <Typography variant="h6" component="p">
            {!isUser && `${message.username}: `} {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
