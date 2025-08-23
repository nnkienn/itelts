import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/layout/Testimonials";
import Stats from "@/components/layout/Stats";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Hi, Kiên Nguyễn Trung! 🚀 <br />
          What do you want to work on today?
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Choose a tool below to start improving your IELTS skills with AI.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Translate */}
          <Link
            href="/translate"
            className="flex flex-col items-start p-6 rounded-2xl border hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-blue-100 flex items-center justify-center rounded-full">
                🌍
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Translate Tool
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Translate text between multiple languages quickly and accurately.
            </p>
          </Link>

          {/* Grade Writing */}
          <Link
            href="/grade"
            className="flex flex-col items-start p-6 rounded-2xl border hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-green-100 flex items-center justify-center rounded-full">
                ✍️
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Grade Writing
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Get instant feedback on your IELTS Writing tasks with AI grading.
            </p>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <Testimonials />
      </section>

      {/* Stats Section */}
      <section className="px-8 py-16 bg-gray-50 flex justify-center">
        <Stats></Stats>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
