"use client"
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { registerUser } from "@/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation"; // App Router dùng "next/navigation" chứ không phải "next/router"
import React, { useState } from "react";

export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [name,setName] = useState("")
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const res = await dispatch(registerUser({name,email,password}))
        if(registerUser.fulfilled.match(res)){
            router.push("/homepage")
        }
    }
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-200 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden ">
                {/*RIGHT */}
                <div className="md:w-1/2">
                    <img src="/images/login.png" alt="" className="object-cover h-full w-full rounded-2xl" />
                </div>
                {/*lEFT */}
                <div className="md:w-1/2 w-full p-8 md:p-10">
                    <h1 className="md:text-3xl text-gray-400 font-bold">Welcome!</h1>
                    <p className="text-gray-400 text-sm mb-6">Sign up to start improving your writing skills.</p>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <span className="px-2 text-gray-400 text-sm ">Name</span>
                        <input type="name" onChange={e=>setName(e.target.value)} value={name} name="name" id="name" className="border-2 w-full border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <span className="px-2 text-gray-400 text-sm ">Email</span>
                        <input type="email" onChange={e=>setEmail(e.target.value)} value={email} name="email" id="email" className="border-2 w-full border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <span className="px-2 text-gray-400 text-sm ">Password</span>
                        <input type="password" onChange={e=>setPassword(e.target.value)} value={password} name="password" id="password" className="border-2 w-full border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <button type="submit" className="w-full rounded-4xl border-2 px-2 py-2 text-white font-bold bg-green-500 hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed">Login</button>
                    </form>
                    <div className="mt-6 flex items-center justify-center">
                        <Link
                            href="/signin"
                            className=""
                        >
                            <span className=" text-sm text-gray-500 font-bold">If you have account? </span>
                            <span className="text-sm text-green-600 font-semibold underline">Please login here</span>
                        </Link>
                    </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="px-4 text-sm text-gray-500">Or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    {/*sOCIAL MEDIA */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button type="button" className="flex-1 flex items-center justify-center space-x-2 text-gray-500 rounded-md border px-4 py-2 hover:bg-gray-50 text-sm md:text-base">
                            <img src="/images/facebook.jpg" alt="/images/facebook.jpg" className="h-5 w-5" />
                            <span>Login with facebook</span>
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center space-x-2 text-gray-500 rounded-md border px-4 py-2 hover:bg-gray-50 text-sm md:text-base">
                            <img src="/images/google.png" alt="/facebook.png" className="h-5 w-5" />
                            <span>Login with google</span>
                        </button>
                    </div>



                </div>
            </div>

            


        </div>
    )
}