export function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="skeleton h-10 w-64 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="skeleton h-36 rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton h-44 rounded-xl" />
        ))}
      </div>
    </div>
  );
}