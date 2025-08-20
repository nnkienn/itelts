'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loginUser } from '@/features/auth/authThunk';
import Link from 'next/link';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(null);

    // (optional) client-side validation
    if (!formData.email || !formData.password) return;

    const result = await dispatch(
      loginUser({ email: formData.email, password: formData.password, remember: formData.remember })
    );

    if (loginUser.fulfilled.match(result)) {
      setSuccessMsg('✅ Đăng nhập thành công!');
      // TODO: router.push('/dashboard')
    } else {
      setSuccessMsg(null);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-200 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg bg-white">
        {/* Left banner */}
        <div className="md:w-1/2 h-full">
          <img
            src="/login.png"
            alt="AI chấm bài viết"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome!</h1>

          {/* Social login (dummy) */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button type="button" className="flex-1 flex items-center justify-center space-x-2 rounded-md border px-4 py-2 hover:bg-gray-50 text-sm md:text-base text-gray-500">
              <img src="/facebook.jpg" alt="Facebook" className="h-5 w-5" />
              <span>Login with Facebook</span>
            </button>
            <button type="button" className="flex-1 flex items-center justify-center space-x-2 text-gray-500 rounded-md border px-4 py-2 hover:bg-gray-50 text-sm md:text-base">
              <img src="/apple.png" alt="Apple" className="h-5 w-5" />
              <span>Login with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Messages */}
          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {typeof error === 'string' ? error : 'Login failed'}
            </div>
          )}
          {successMsg && (
            <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border-2 border-gray-200 px-4 py-2 text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300 "
              autoComplete="email"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password (min 12 chars)"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border-2 border-gray-200 px-4 py-2 text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300"
              autoComplete="current-password"
              required
            />

            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="rounded border-2 border-gray-400 text-green-600 focus:ring-green-400"
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-500 py-2 text-white font-semibold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/register"
              className=""
            >
              <span className=" text-sm text-gray-800 font-bold">If you don't have account? </span>
              <span className=" text-sm text-gray-500 underline">Please reigster here</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
