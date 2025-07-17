import type { APIMode } from "../App";
import "./sidebar.css";

type SidebarProps = {
  mode: APIMode;
  setMode: (mode: APIMode) => void;
  options: string[];
};

export default function Sidebar({mode, setMode, options}: SidebarProps){
    return(
        <div className="sidebar">
            {options.map((option) => (
                <button
                key={option}
                className={mode === option ? "sidebar-btn active" : "sidebar-btn"}
                onClick={() => setMode(option as APIMode)}
                >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
            ))}
        </div>
    );
}