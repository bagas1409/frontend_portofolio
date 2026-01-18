"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-600 mb-8">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition-all font-medium"
            >
                Try again
            </button>
        </div>
    );
}
