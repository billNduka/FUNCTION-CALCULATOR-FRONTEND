import type { APIMode } from "../App";
import { SAMPLE_EXPRESSIONS } from "../App";
import "./sidebar.css";

type SidebarProps = {
  mode: APIMode;
  setMode: (mode: APIMode) => void;
  setSampleExpression: (expression: string) => void;
  setExpression: (expression: string) => void;
  options: string[];
};

export default function Sidebar({mode, setMode, setSampleExpression, setExpression, options}: SidebarProps){
    return(
        <div className="sidebar">
            {options.map((option) => (
                <button
                key={option}
                className={mode === option ? "sidebar-btn active" : "sidebar-btn"}
                onClick={() => {
                    setMode(option as APIMode);
                    setSampleExpression(SAMPLE_EXPRESSIONS[option as APIMode]);
                    setExpression(SAMPLE_EXPRESSIONS[option as APIMode]);
                }}
                >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
            ))}
        </div>
    );
}