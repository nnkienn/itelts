"use client";
import React from "react";

interface GrammarCardProps {
  before?: string;
  after?: string;
  explanation?: string;
}

const GrammarCard: React.FC<GrammarCardProps> = ({
  before = "socialist",
  after = "social",
  explanation = "While it offers platforms for creativity and connection, it also introduces challenges such as cyberbullying, social comparison, and addiction function.",
}) => {
  return (
    <div className="border rounded-lg p-4 text-left space-y-3">
      <p className="font-medium text-gray-700">Use a different part of speech</p>

      <p className="text-gray-800">
        <span className="line-through text-red-500">{before}</span>{" "}
        <span className="font-bold text-green-700">{after}</span> comparison,
      </p>
      <p className="text-gray-600 text-sm">{explanation}</p>

      <div className="flex gap-3">
        <button className="bg-green-600 text-white px-4 py-1 rounded-full font-semibold flex items-center gap-1">
          ✔ Accept
        </button>
        <button className="text-gray-600 flex items-center gap-1">
          🗑 Ignore
        </button>
      </div>
    </div>
  );
};

export default GrammarCard;
