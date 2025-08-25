"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

interface SettingsLayoutProps {
  children: React.ReactNode;
  active: string;
  onChange: (tab: string) => void;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, active, onChange }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 pt-16 md:pt-20">
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-60 border-r bg-white shadow-sm">
        <Sidebar active={active} onChange={onChange} />
      </aside>

      {/* Sidebar Mobile Drawer */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              active={active}
              onChange={(tab) => {
                onChange(tab);
                setOpenSidebar(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <h1 className="font-semibold text-gray-700">Settings</h1>
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FiMenu size={20} />
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-10 flex justify-center">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayout;
