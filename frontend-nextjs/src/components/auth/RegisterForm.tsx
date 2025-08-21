import Link from 'next/link'

export default function RegisterForm() {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-200 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg bg-white">
                {/* Left banner */}
                <div className="md:w-1/2 h-full">
                    <img src="/login.png" alt="Ai cham bai viet" className="rounded-2xl h-full w-full object-cover" />
                </div>
                {/* right banner */}
                <div className="w-full md:w-1/2 p-8 md:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-500">Welcome!</h1>
                    <p className="text-gray-400 text-sm mb-6">Sign up to start improving your writing skills.</p>
                    <form action="" className="mt-4 space-y-4">
                        <span className="px-2 text-gray-400 text-sm ">Name</span>
                        <input type="name" name="name" id="name" className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <span className="px-2 text-gray-400 text-sm ">Email</span>
                        <input type="email" name="email" id="email" className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <span className="px-2 text-gray-400 text-sm ">Password</span>
                        <input type="password" name="password" id="email" className="w-full border-2 border-gray-200 rounded-2xl px-4 py-2 text-gray-600" />
                        <button
                            className="w-full rounded-2xl bg-green-400 py-2 text-white font-semibold hover:bg-green-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            type="submit">
                            Register
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-center">
                        <Link
                            href="/signin"
                            className=""
                        >
                            <span className=" text-sm text-gray-500 font-bold">If you have an account? </span>
                            <span className=" text-sm text-gray-500 underline">Please login here</span>
                        </Link>
                    </div>
                    {/* Divider */}
                    <div className="mt-6 flex items-center">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="px-4 text-sm text-gray-500">Or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    {/* social media*/}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button type="button" className="flex-1 flex items-center justify-center space-x-1 text-gray-500 border-2 border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50 text-sm md:text-base">
                            <img src="/facebook.jpg" alt="/facebook.png" className="h-5 w-5" />
                            <span>Facebook</span>
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center space-x-1 text-gray-500 border-2 border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50 text-sm md:text-base">
                            <img src="/google.png" alt="/facebook.png" className="h-5 w-5" />
                            <span>Google</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}