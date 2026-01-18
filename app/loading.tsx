export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-1 bg-[var(--color-secondary)] overflow-hidden rounded-full relative">
                    <div className="absolute top-0 left-0 h-full w-full bg-[var(--color-primary)] animate-progress origin-left" />
                </div>
                <p className="text-[var(--color-primary)] font-medium text-sm tracking-widest animate-pulse">LOADING</p>
            </div>
        </div>
    );
}
