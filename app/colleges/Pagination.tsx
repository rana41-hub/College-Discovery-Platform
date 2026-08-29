import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: { [key: string]: string | undefined };
}) {
  if (totalPages <= 1) return null;

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", targetPage.toString());
    return `/colleges?${params.toString()}`;
  };

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {hasPrev ? (
        <Link href={buildHref(page - 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-lg text-gray-300 cursor-not-allowed">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>

      {hasNext ? (
        <Link href={buildHref(page + 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-lg text-gray-300 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}
