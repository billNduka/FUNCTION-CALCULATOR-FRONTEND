import React from "react";
<<<<<<< HEAD
import "./styles/solveButton.css";
=======
import "./solveButton.css";
>>>>>>> origin/main

type SolveButtonProps = {
    onClick: () => Promise<void>;
    children?: React.ReactNode;
};

export default function SolveButton({onClick, children}: SolveButtonProps) {
    return (
    <button className="solveBtn" onClick={onClick}>
      {children || "Solve"}
    </button>
  );
}