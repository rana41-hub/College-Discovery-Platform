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
  const { colleges, total, page, totalPages } = await getColleges(searchParams);

  if (colleges.length === 0) {
    return <p className="text-gray-500 mt-8">No colleges match your filters.</p>;
  }

  return (
    <>
      <p className="text-sm text-gray-500 mt-4 mb-2">{total} colleges found</p>
      <CollegeGridClient colleges={colleges} />
      <Pagination page={page} totalPages={totalPages} searchParams={searchParams} />
    </>
  );
}
