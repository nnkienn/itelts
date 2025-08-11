// src/features/auth/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "@/lib/auth/authApi";
import type { LoginPayload, RegisterPayload } from "./authType";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const data = await registerApi(payload);
      if (!data) throw new Error("Empty response");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Register failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);
      if (!data) throw new Error("Empty response");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Login failed"
      );
    }
  }
);
