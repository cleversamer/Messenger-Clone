import React from "react";

const Message = (props) => {
  return (
    <div className="message">
      <h2>
        {props.username}: {props.text}
      </h2>
    </div>
  );
};

export default Message;
