"use client";

import { registerUser } from "@/features/auth/authThunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useState } from "react";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    roleId: 1,
  });
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, name, dateOfBirth, roleId } = formData;
    console.log("Registering user:", { email, password, name, dateOfBirth, roleId });
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      alert("✅ Đăng ký thành công!");
    } else {
      alert("❌ Đăng ký thất bại!");
    }
  };

  return (
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="date" name="dateOfBirth" placeholder="Date of Birth" required onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{String(error)}</p>}
    </div>
  );
}
