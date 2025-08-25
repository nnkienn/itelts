"use client";
import React from "react";

export type TabType = "all" | "grammar" | "recommendations";

interface ScoreHeaderProps {
  score: number;
  totalIssues?: number;
  grammarIssues?: number;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onViewDetails?: () => void;
}

const ScoreHeader: React.FC<ScoreHeaderProps> = ({
  score,
  totalIssues = 0,
  grammarIssues = 0,
  activeTab = "all",
  onTabChange = () => {},
  onViewDetails = () => {},
}) => {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      {/* LEFT: Score */}
      <div className="flex items-center gap-3">
        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-lg">
          {score}
          <span className="text-gray-600 font-normal text-sm"> /100</span>
        </span>
        <span className="text-gray-800 font-semibold">Writing score</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <button
          onClick={onViewDetails}
          className="text-green-700 font-medium hover:underline"
        >
          View details
        </button>

        <div className="flex gap-4 text-sm font-medium">
          <button
            onClick={() => onTabChange("all")}
            className={`pb-1 ${
              activeTab === "all"
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-600"
            }`}
          >
            All{" "}
            <span className="ml-1 bg-gray-200 px-2 py-0.5 rounded">
              {totalIssues}
            </span>
          </button>

          <button
            onClick={() => onTabChange("grammar")}
            className={`pb-1 ${
              activeTab === "grammar"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Grammar <span className="ml-1 text-red-600">{grammarIssues}</span>
          </button>

          <button
            onClick={() => onTabChange("recommendations")}
            className={`pb-1 flex items-center gap-1 ${
              activeTab === "recommendations"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            Recommendations ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreHeader;
