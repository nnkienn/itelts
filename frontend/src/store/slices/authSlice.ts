import { AuthResponse, AuthService } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import build from "next/dist/build";

interface AuthState {
    user: AuthResponse["user"] | null;
    accessToken: string | null,
    refreshToken: string | null,
    loading: boolean;
    error: string | null
}
const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
}
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
            return await AuthService.login(data.email, data.password)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
)
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: { name: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            return await AuthService.register(data.name, data.email, data.password)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }

)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null,
                state.accessToken = null,
                state.refreshToken = null
        },
        loadAuthFromStorage: (state) => {
            const data = localStorage.getItem("auth");
            if (data) {
                const parsed = JSON.parse(data);
                state.user = parsed.user;
                state.accessToken = parsed.accessToken;
                state.refreshToken = parsed.refreshToken;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(loginUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.accessToken = action.payload.backendTokens.accessToken;
                    state.refreshToken = action.payload.backendTokens.refreshToken;
                    // Lưu localStorage
                    localStorage.setItem("auth", JSON.stringify(state));
                })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload as string
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.backendTokens.accessToken;
                state.refreshToken = action.payload.backendTokens.refreshToken;
                localStorage.setItem("auth", JSON.stringify(state));
            })
    }
})


export const {logout, loadAuthFromStorage} =authSlice.actions;
export default authSlice.reducer