"use client";
import React from "react";
import { FaUser, FaClipboardList, FaSlidersH } from "react-icons/fa";

interface SidebarProps {
  active: string;
  onChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  const items = [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "plan", label: "Your Plan", icon: <FaClipboardList /> },
    { key: "preferences", label: "Preferences", icon: <FaSlidersH /> },
  ];

  return (
    <div className="w-56 bg-white border-r shadow-sm">
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-2 px-5 py-3 w-full text-left font-medium border-l-4 ${
                active === item.key
                  ? "border-green-600 text-green-600 bg-green-50"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
