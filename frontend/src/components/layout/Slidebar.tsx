import Link from "next/link";

const Item = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="block px-3 py-2 rounded hover:bg-gray-100 transition"
    >
        {children}
    </Link>
);

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r h-screen sticky top-0 p-4">
            <h2 className="text-x1 font-bold mb-6">AI-SCORING</h2>
            <nav className="space-y-2">
                <Item href="/dashboard">🏠 Dashboard</Item>
                <Item href="/writing">✍️ Writing Practice</Item>
                <Item href="/submissions">📄 My Submissions</Item>
                <Item href="/subscription">💳 Subscription</Item>
                <Item href="/settings">⚙️ Settings</Item>
            </nav>
        </aside>
    )
}
