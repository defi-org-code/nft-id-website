import React from "react";
import { useMainStore } from "../../context/MainContext";

function Message() {
  const { message } = useMainStore();
  return (
    <div className="message">
      <section>{message}</section>
    </div>
  );
}

export default Message;
