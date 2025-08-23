import Navbar from "@/components/layout/Navbar"
import Testimonials from "@/components/layout/Testimonials"
import Footer from "@/components/layout/Footer"


import Link from "next/link"

export default function page() {
    return (
        <div>
            <div className="flex flex-col">

                <Navbar></Navbar>

                {/*Section hero*/}
                <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
                    {/*left content*/}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-5xl font-semibold leading-snug">
                            <span className="text-gray-600 font-medium">Your</span>{" "}
                            <span className="text-gray-700">ideas,</span>{" "}
                            <br />
                            {/* better + underline cong */}
                            <span className="relative font-medium inline-block text-green-600 mx-1">
                                better
                                <svg
                                    className="absolute left-0 -bottom-2 w-full h-3"
                                    viewBox="0 0 120 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 15 C 40 5, 80 5, 115 15"
                                        stroke="#16A34A"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <span className="text-green-600 font-semibold ">writing</span>
                        </h1>
                        <p className="mt-4 text-gray-400 text-lg font-medium">
                            We use AI to strengthen writing and boost productivity - without
                            sacrificing authenticity.
                        </p>
                        <div className="mt-6">
                            <Link href="/signup" className="px-8 py-3 bg-teal-600 border rounded-4xl font-semibold shadow hover:bg-green-500">
                                Sign up now. It's free!
                            </Link>
                        </div>
                        <div className="mt-2 py-4 flex gap-4 text-gray-400 text-sm md:justify-start">
                            <span>🌿One of favorite tools🌿</span>
                            <span>⭐ 4.5/5</span>
                            <span>👥 1000+ users</span>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                        <video src="/video/demo.mp4" autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-lg" > </video>
                    </div>
                </section>
                {/*Section text*/}
                <section className="bg-teal-50 grid place-items-center text-center px-6 py-16">
                    <span className="text-4xl font-medium mb-4 text-gray-600">
                        AI that writes with you, not for you
                    </span>
                    <span className="text-gray-600 max-w-2xl">
                        IeltsScoring works alongside you to help you craft clear, polished, and professional writing — in a fraction of the time it usually takes. Welcome to the future of writing.
                    </span>
                </section>
                {/*Section feedback*/}
                <Testimonials></Testimonials>

                <section className="px-8 py-16 bg-white flex justify-center">
                    <div className="w-full max-w-5xl rounded-3xl border border-green-500 shadow-lg shadow-green-100 p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-12">
                            Millions are becoming better writers
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                            <div>
                                <p className="text-3xl font-bold text-green-600">1000+</p>
                                <p className="text-gray-600">Writers<br />worldwide</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-green-600">3+</p>
                                <p className="text-gray-600">Countries that<br />use ScoringIelts</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-green-600">140+</p>
                                <p className="text-gray-600">Institutions partnered<br />with ScoringIelts</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-green-600">4.7/5</p>
                                <p className="text-gray-600">rating</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer></Footer>



            </div>


        </div>
    )
}