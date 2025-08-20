"use client";

import { registerUser } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    roleId: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      alert("✅ Đăng ký thành công!");
    } else {
      alert("❌ Đăng ký thất bại!");
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl bg-white">

        {/* Left: AI illustration */}
        <div className="md:w-1/2 h-full">
          <img
            src="/login.png"
            alt="AI chấm bài viết"
            className="w-full h-full object-cover"
          />
        </div>


        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng!</h1>
          <p className="text-gray-500 mb-6">Đăng ký để bắt đầu cải thiện kỹ năng viết của bạn.</p>

          {/* Social login */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 text-sm">
              <img src="/facebook.jpg" alt="Facebook" className="h-5 w-5" />
              <span>Facebook</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 text-sm">
              <img src="/apple.png" alt="Apple" className="h-5 w-5" />
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-sm text-gray-500">Hoặc</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu (tối thiểu 12 ký tự)"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 transition"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/login"
              className=""
            >
              <span className=" text-sm text-gray-800 font-bold">If you have account? </span>
              <span className=" text-sm text-gray-500 underline">Please sign in here</span>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
