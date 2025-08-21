import Image from "next/image";
import Link from "next/link";

export default function PublicHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-white">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your ideas, <span className="text-green-600">better writing</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            We use AI to strengthen writing and boost productivity — without
            sacrificing authenticity.
          </p>
          <div className="mt-6">
            <Link
              href="/register"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500"
            >
              Sign up now. It’s free!
            </Link>
          </div>
          <div className="mt-4 flex gap-4 justify-center md:justify-start text-sm text-gray-500">
            <span>⭐ 4.7/5</span>
            <span>👥 4.5M+ users</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/hero-demo.png" // 👉 thay bằng ảnh demo hoặc illustration của bạn
            alt="Demo App"
            width={400}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why writers love us
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            {
              quote:
                "QuillBot is one of my favorite tools, and I use it daily. It will save you time and money.",
              name: "Jerry Keszka",
              role: "Content creator",
            },
            {
              quote:
                "Their paraphrasing tool helps me generate unique sentences while maintaining the same context.",
              name: "Daniel Völk",
              role: "Published author",
            },
            {
              quote:
                "As a teacher, I’ve always needed something to simplify my writing process. This tool enhances my creativity.",
              name: "Akshita Thakur",
              role: "English language trainer",
            },
            {
              quote:
                "As a student, QuillBot has been a game-changer. It helps me save time on assignments.",
              name: "Danisha Verma",
              role: "Student",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
              <div className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold">
            Start writing clearly and confidently
          </h2>
          <p className="mt-4 text-gray-600">
            By enhancing your communication and giving your writing greater
            impact, we can help you reach your personal and professional goals.
          </p>
          <div className="mt-6">
            <Link
              href="/register"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-500"
            >
              Sign up now. It’s free!
            </Link>
          </div>
        </div>

        {/* Mascot Image */}
        <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/mascot.png" // 👉 thay bằng icon/mascot bạn thích
            alt="Mascot"
            width={200}
            height={200}
          />
        </div>
      </section>
    </div>
  );
}
