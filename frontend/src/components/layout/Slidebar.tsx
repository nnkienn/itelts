"use client";

import { AiOutlineMenu, AiOutlineBarChart, AiOutlineHistory, AiOutlineDollarCircle, AiOutlineSetting, AiOutlineLogout, AiOutlineUser, AiOutlineQuestionCircle } from "react-icons/ai";
import Link from "next/link";

const Item = ({ href, icon, label, isOpen }: { href: string; icon: React.ReactNode; label: string; isOpen: boolean }) => (
  <Link href={href} className="relative flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition group">
    {icon}
    {isOpen && <span>{label}</span>}
    {!isOpen && (
      <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
        {label}
      </span>
    )}
  </Link>
);

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#c6cfeb] text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header + Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">KN</div>
            <span className="font-semibold">Kiên Nguyễn</span>
          </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu size={22} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Item href="/grade" icon={<AiOutlineBarChart size={20} />} label="Grade by AI" isOpen={isOpen} />
        <Item href="/history" icon={<AiOutlineHistory size={20} />} label="History" isOpen={isOpen} />
        <Item href="/pricing" icon={<AiOutlineDollarCircle size={20} />} label="Pricing" isOpen={isOpen} />
        <Item href="/settings" icon={<AiOutlineSetting size={20} />} label="Settings" isOpen={isOpen} />
      </nav>

      {/* Footer menu */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Item href="/support" icon={<AiOutlineQuestionCircle size={20} />} label="Customer Support" isOpen={isOpen} />
        <Item href="/account" icon={<AiOutlineUser size={20} />} label="My Account" isOpen={isOpen} />

        <button
          onClick={() => console.log("Sign out clicked")}
          className="relative flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 transition w-full text-left group"
        >
          <AiOutlineLogout size={20} />
          {isOpen && <span>Sign Out</span>}
          {!isOpen && (
            <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
