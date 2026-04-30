import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import {
  LayoutDashboard,
  Building2,
  Users,
  Workflow,
  Settings,
} from "lucide-react";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { label: "Organizations", path: "/app/organizations", icon: Building2 },
    { label: "Users", path: "/app/users", icon: Users },
    { label: "Workflows", path: "/app/workflows", icon: Workflow },
    { label: "Settings", path: "/app/settings", icon: Settings },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside
        className={`bg-black text-white flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >

        {/* BRAND + TOGGLE */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-lg font-bold tracking-wide">SaaS Pro</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs bg-white text-black px-2 py-1 rounded"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.path} className="relative group">

                {/* ACTIVE INDICATOR */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-green-500 rounded-r"></span>
                )}

                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 pl-4 rounded-md text-sm transition
                    ${
                      active
                        ? "bg-white text-black font-medium"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.label}</span>}
                </button>

                {/* TOOLTIP */}
                {collapsed && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2
                    bg-black text-white text-xs px-2 py-1 rounded shadow-lg
                    opacity-0 group-hover:opacity-100 transition
                    whitespace-nowrap z-50"
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* FOOTER */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
            © 2026 SaaS Pro
          </div>
        )}
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h2 className="font-semibold text-gray-800">
            {navItems.find(i => isActive(i.path))?.label || "Dashboard"}
          </h2>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm cursor-pointer"
            >
              U
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    navigate("/app/profile");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/app/settings");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Settings
                </button>

                <div className="border-t my-1"></div>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}