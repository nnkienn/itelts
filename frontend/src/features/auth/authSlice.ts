// src/features/auth/authSlice.ts
import { registerUser, loginUser } from "./authThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: any | null;
  loading: boolean;
  error: string | null;
};
const initialState: AuthState = { user: null, loading: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      if (state.user) state.user.token = action.payload;
    },
  },
  extraReducers: (b) => {
    // register
    b.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(registerUser.fulfilled, (s, a) => {
      s.loading = false;
      const p: any = a.payload ?? {};
      // backend register trả "user"
      s.user = p.user ?? null;
      s.error = null;
      // nếu muốn lưu token từ register:
      // localStorage.setItem('accessToken', p.accessToken ?? '');
    });
    b.addCase(registerUser.rejected, (s, a) => {
      s.loading = false; s.error = (a.payload as string) ?? "Register failed";
    });

    // login
    b.addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(loginUser.fulfilled, (s, a) => {
      s.loading = false;
      const p: any = a.payload ?? {};
      s.user = p.userWithoutPassword ?? p.user ?? null;
      s.error = null;
      const access = p.backendTokens?.accessToken;
      if (access) localStorage.setItem('accessToken', access);
    });
    b.addCase(loginUser.rejected, (s, a) => {
      s.loading = false; s.error = (a.payload as string) ?? "Login failed";
    });
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
