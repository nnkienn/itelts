import Editor from "@/components/Editor";
import Footer from "@/components/layout/Footer";

export default function WritingCheckerService() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <section className="grid place-items-center text-center bg-[#edf6f6] px-6 py-16">
                {/* Hàng trên: Badge + Title + FREE */}
                <div className="flex items-center gap-2 mb-3">
                    {/* Badge nhỏ bên trái */}
                    <span className="px-3 py-1 text-xs font-semibold rounded bg-teal-700 text-white">
                        Scoring IELTS
                    </span>

                    {/* Tiêu đề chính */}
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
                        Free IELTS Writing Checker 2.0
                    </h1>

                    {/* Badge FREE */}
                    <span className="px-2 py-0.5 text-xs font-bold border-2 border-teal-700 text-teal-700 rounded">
                        FREE
                    </span>
                </div>

                {/* Subtext */}
                <p className="text-sm md:text-base font-medium text-teal-700 mb-4">
                    ✨ AI-Powered | Trained on a Large Dataset
                </p>

                {/* Features Row 1 */}
                <div className="flex flex-wrap justify-center gap-4 mb-3">
                    <h1 className="text-sm font-medium text-teal-800">
                        ✔️ High Accuracy with Trained AI
                    </h1>
                    <h1 className="text-sm font-medium text-teal-800">
                        📄 Writing Task 1 & Task 2
                    </h1>
                    <h1 className="text-sm font-medium text-teal-800">
                        💡 Upgrade Grammar & Vocabulary
                    </h1>
                </div>

                {/* Features Row 2 */}
                <div className="flex flex-wrap justify-center gap-4 mb-3">
                    <h1 className="text-sm font-medium text-teal-800">
                        🌍 Used by 350,000+ Users Worldwide
                    </h1>
                    <h1 className="text-sm font-medium text-teal-800">
                        👥 Trusted by Global Tutors & Teachers
                    </h1>
                </div>
            </section>

            {/* Main: editor + scoring */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 p-6">
                {/* Left: Editor */}
                <Editor />

                {/* Right: Scoring panel */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Writing Feedback
                    </h2>
                    <div className="text-center text-gray-400">
                        <p>⚡ Enter at least 25 words to see score.</p>
                        <p className="mt-2">Nothing to check yet!</p>
                    </div>
                </div>

            </div>
            
            <Footer/>
        </div>
    );
}
