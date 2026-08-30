export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-4 w-16 bg-gray-100 rounded mb-4" />
      <div className="h-8 w-2/3 bg-gray-100 rounded mb-2" />
      <div className="h-4 w-1/3 bg-gray-100 rounded mb-8" />
      <div className="flex gap-3 mb-10">
        <div className="h-7 w-20 bg-gray-100 rounded-full" />
        <div className="h-7 w-28 bg-gray-100 rounded-full" />
        <div className="h-7 w-24 bg-gray-100 rounded-full" />
      </div>
      <div className="h-4 w-24 bg-gray-100 rounded mb-3" />
      <div className="h-20 bg-gray-100 rounded-2xl mb-10" />
      <div className="h-4 w-32 bg-gray-100 rounded mb-3" />
      <div className="h-40 bg-gray-100 rounded-2xl" />
    </div>
  );
}
