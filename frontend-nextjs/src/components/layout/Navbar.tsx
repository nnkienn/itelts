import Link from "next/link";

export default function navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 shadow bg-white h-12 flex items-center">
            <div className="container mx-auto flex justify-between items-center px-6">

                <div className="flex items-center gap-2">
                    <img src="/imageLogoNavbar.png" alt="Logo"
                        width={32}
                        height={32}
                        className="rounded-lg" />
                    <span className="font-bold text-2xl text-gray-600">Scoring<span className="text-teal-600">Ielts</span> </span>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="border border-gray-400 text-sm font-bold text-gray-500 px-4 py-1.5 rounded-md hover:bg-gray-100 flex items-center gap-1"
                    >
                        ► Sign up / Log in
                    </Link>
                </div>

            </div>
        </header>
    )
}