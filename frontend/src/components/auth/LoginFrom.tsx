'use client';

import { loginUser } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);


  const [formData, setFormData] = useState({ email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState<string | null>(null); // 👈 thêm state thông báo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(null); // reset thông báo
    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      setSuccessMsg("✅ Đăng nhập thành công!");
    } else {
      setSuccessMsg(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Login</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
