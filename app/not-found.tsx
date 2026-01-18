import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-9xl font-bold text-[var(--color-primary)] opacity-20">404</h1>
            <h2 className="text-3xl font-bold text-[var(--color-primary)] -mt-12 mb-6 relative z-10">
                Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition-all font-medium"
            >
                Back to Home
            </Link>
        </div>
    );
}
