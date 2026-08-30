import CollegeGridClient from "./CollegeGridClient";
import Pagination from "./Pagination";

async function getColleges(searchParams: { [key: string]: string | undefined }) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/colleges?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch colleges");
  return res.json();
}

export default async function CollegeGrid({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { colleges, total, page, totalPages, stats } = await getColleges(searchParams);

  if (colleges.length === 0) {
    return <p className="text-gray-500 mt-8">No colleges match your filters.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
        <div>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">Colleges found</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            ₹{(stats.avgFees / 100000).toFixed(1)} LPA
          </p>
          <p className="text-xs text-gray-500">Avg. starting fees</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">★ {stats.avgRating.toFixed(1)}</p>
          <p className="text-xs text-gray-500">Avg. rating</p>
        </div>
      </div>

      <CollegeGridClient colleges={colleges} />
      <Pagination page={page} totalPages={totalPages} searchParams={searchParams} />
    </>
  );
}
