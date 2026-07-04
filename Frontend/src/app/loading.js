export default function Loading() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 h-8 w-48 animate-pulse rounded-full bg-stone-200" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[28px] border border-stone-200 bg-white p-4 shadow-soft"
          >
            <div className="mb-4 aspect-[4/5] animate-pulse rounded-[22px] bg-stone-200" />
            <div className="mb-2 h-5 w-2/3 animate-pulse rounded-full bg-stone-200" />
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-stone-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
