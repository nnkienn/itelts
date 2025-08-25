"use client";
import React from "react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Changing the password will sign you out of all your sessions.
        </p>

        <form className="space-y-3">
          <input
            type="password"
            placeholder="Current password"
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
            >
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
