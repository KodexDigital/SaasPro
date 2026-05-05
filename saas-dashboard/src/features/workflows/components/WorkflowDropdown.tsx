import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WorkflowDropdown({ item }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      {/* parent */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
      >
        <span>{item.label}</span>
        <ChevronDown size={16} />
      </button>

      {/* children */}
      {open && (
        <div className="ml-6 space-y-1">
          {item.children.map((child: any) => (
            <button
              key={child.path}
              onClick={() => navigate(child.path)}
              className={`block w-full text-left px-3 py-2 text-sm rounded ${
                isActive(child.path)
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}