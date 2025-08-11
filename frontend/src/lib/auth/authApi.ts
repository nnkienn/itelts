import { LoginPayload, RegisterPayload, AuthResponse } from "@/features/auth/authType";
import axiousInstance from "../axiosInstance";

export const registerApi = async (payload: RegisterPayload)=> {
    try {
        const response = await axiousInstance.post('/auth/register', payload);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

export const loginApi = async (payload: LoginPayload) => {
    try {
        const response = await axiousInstance.post('/auth/login', payload);
        return response.data?? null; // Trả về null nếu không có dữ liệu
    } catch (error) {
        console.error("Error during login:", error);
    }
}
