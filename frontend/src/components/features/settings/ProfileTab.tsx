"use client";
import React from "react";

interface ProfileTabProps {
  onChangePassword: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onChangePassword }) => {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Kiên Nguyễn Trung
          </h2>
          <p className="text-gray-600">kientrungng.2002@gmail.com</p>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-xl shadow p-6 w-full flex justify-between">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">Name</p>
            <p className="text-gray-700">Kiên Nguyễn Trung</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Verified email ✅
            </p>
            <p className="text-gray-700">kientrungng.2002@gmail.com</p>
            <p className="text-xs text-gray-500">Account linked with Google</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Subscription</p>
            <p className="text-gray-700">Free</p>
            <p className="text-xs text-gray-500">User since Sep 2021</p>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onChangePassword}
            className="text-green-600 font-medium hover:underline"
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
