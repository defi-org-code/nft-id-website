import React, { ReactNode } from "react";
import Typist from "react-typist";
const cursor = {
  show: false,
  blink: true,
  element: ".",
};

const avgTypingDelay = 10;

interface IProps {
  children: ReactNode;
  onTypingDone?: () => void;
}
function Typing({ children, onTypingDone }: IProps) {
  return (
    <Typist
      onTypingDone={onTypingDone}
      avgTypingDelay={avgTypingDelay}
      cursor={cursor}
    >
      {children}
    </Typist>
  );
}

export default Typing;
