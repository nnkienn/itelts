import axios from "axios";
import { register } from "module";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export interface AuthResponse{
    user :{
        id : number,
        email : string,
        name : string;
        role ?: string;
    };
    backendTokens :{
        accessToken: string;
        refreshToken : string;
    }
}
export const AuthService = {
    login : async (email : string, password : string) : Promise<AuthResponse> =>{
        const res = await api.post("/auth/login",{email,password})
        return res.data
    },
     register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const res = await api.post("/auth/register", { name, email, password, roleId: 2 });
    return res.data;
  },
}