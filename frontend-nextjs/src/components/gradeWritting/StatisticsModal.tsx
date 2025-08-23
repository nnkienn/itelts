"use client";
import React from "react";

interface ScoreItem {
  label: string;
  score: number | null;
}

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  writingScore: number;
  details: ScoreItem[];
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({
  isOpen,
  onClose,
  writingScore,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn"
      onClick={onClose} // click outside close
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // ngăn click bên trong đóng
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <p className="text-gray-600 mb-6">Writing score</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {details.map((item, idx) => (
              <p key={idx} className="flex justify-between text-sm">
                <span>{item.label}</span>
                <span className="font-semibold">
                  {item.score !== null ? `${item.score}/100` : "--/100"}
                </span>
              </p>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-700">
                {writingScore}
              </span>
            </div>
            <p className="mt-2 text-green-600 font-semibold">Good</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 border rounded-lg p-3 text-sm text-gray-600 flex items-center justify-between">
          <span>To see your delivery score, set your writing task</span>
          <button className="px-3 py-1 border rounded font-medium text-sm">
            Writing task ⬇
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsModal;
