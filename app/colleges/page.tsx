import { Suspense } from "react";
import CollegeFilters from "./CollegeFilters";
import CollegeGrid from "./CollegeGrid";

export const dynamic = "force-dynamic";

export default function CollegesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Colleges</h1>

      <CollegeFilters />

      <Suspense fallback={<GridSkeleton />}>
        <CollegeGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}
