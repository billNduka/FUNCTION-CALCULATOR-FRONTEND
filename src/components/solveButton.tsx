import React from "react";
import "./solveButton.css";

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