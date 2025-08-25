"use client";
import React, { useState } from "react";
import Editor from "@/components/features/writing/Editor";
import Footer from "@/components/layout/Footer";
import ScoreHeader, { TabType } from "@/components/features/writing/ScoreHeader";
import GrammarCard from "@/components/features/writing/GrammarCard";
import StatisticsModal from "@/components/features/writing/StatisticsModal";

export default function WritingCheckerService() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header intro */}
      <section className="grid place-items-center text-center bg-[#edf6f6] px-6 py-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-semibold rounded bg-teal-700 text-white">
            Scoring IELTS
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
            Free IELTS Writing Checker 2.0
          </h1>
          <span className="px-2 py-0.5 text-xs font-bold border-2 border-teal-700 text-teal-700 rounded">
            FREE
          </span>
        </div>
        <p className="text-sm md:text-base font-medium text-teal-700 mb-4">
          ✨ AI-Powered | Trained on a Large Dataset
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <h1 className="text-sm font-medium text-teal-800">
            ✔️ High Accuracy with Trained AI
          </h1>
          <h1 className="text-sm font-medium text-teal-800">
            📄 Writing Task 1 & Task 2
          </h1>
          <h1 className="text-sm font-medium text-teal-800">
            💡 Upgrade Grammar & Vocabulary
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <h1 className="text-sm font-medium text-teal-800">
            🌍 Used by 350,000+ Users Worldwide
          </h1>
          <h1 className="text-sm font-medium text-teal-800">
            👥 Trusted by Global Tutors & Teachers
          </h1>
        </div>
      </section>

      {/* Main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Editor />

        <div className="bg-white rounded-2xl shadow p-6">
       
        </div>
      </div>

      <Footer />

      {/* Statistics modal */}
      <StatisticsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        writingScore={87}
        details={[
          { label: "Grammar", score: 95 },
          { label: "Fluency", score: 80 },
          { label: "Clarity", score: 84 },
          { label: "Engagement", score: 95 },
          { label: "Delivery", score: null },
        ]}
      />
    </div>
  );
}
