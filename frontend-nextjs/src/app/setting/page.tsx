"use client";
import React, { useState } from "react";
import Sidebar from "@/components/setting/Sidebar";
import ProfileTab from "@/components/setting/ProfileTab";
import ChangePasswordModal from "@/components/setting/ChangePasswordModal";

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar active={active} onChange={setActive} />

      {/* Content */}
      <div className="flex-1 p-10">
        {active === "profile" && (
          <ProfileTab onChangePassword={() => setShowModal(true)} />
        )}

        {active === "plan" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-2">Your Plan</h2>
            <p className="text-gray-600">
              Free plan — upgrade to Premium anytime 🚀
            </p>
          </div>
        )}

        {active === "preferences" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-2">Preferences</h2>
            <p className="text-gray-600">Dark mode, language settings…</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ChangePasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
