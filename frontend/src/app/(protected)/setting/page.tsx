"use client";
import { useState } from "react";
import SettingsLayout from "@/components/features/settings/SettingsLayout";
import ProfileTab from "@/components/features/settings/ProfileTab";
import ChangePasswordModal from "@/components/features/settings/ChangePasswordModal";

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [showModal, setShowModal] = useState(false);

  return (
    <SettingsLayout active={active} onChange={setActive}>
      <div className="w-full max-w-4xl mx-auto">
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

      <ChangePasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </SettingsLayout>
  );
}
