import SaveComparisonButton from "./SaveComparisonButton";
import BackButton from "@/app/BackButton";

export const dynamic = "force-dynamic";

async function getCompareColleges(ids: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/colleges/compare?ids=${ids}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.colleges;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  if (!searchParams.ids) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        <p className="text-gray-500">Select 2–3 colleges from the listing page to compare.</p>
      </div>
    );
  }

  const colleges = await getCompareColleges(searchParams.ids);

  if (!colleges || colleges.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        <p className="text-gray-500">Couldn't load comparison. Try again.</p>
      </div>
    );
  }

  const rows = [
    { label: "Location", key: "location" },
    { label: "Fees", key: "fees", format: (v: number) => `₹${v.toLocaleString()}` },
    { label: "Rating", key: "rating", format: (v: number) => `★ ${v}` },
    {
      label: "Avg Package",
      key: "avgPackage",
      format: (v: number) => (v ? `₹${(v / 100000).toFixed(1)} LPA` : "—"),
    },
    {
      label: "Placement Rate",
      key: "placementRate",
      format: (v: number) => (v ? `${v}%` : "—"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Compare Colleges</h1>
        <SaveComparisonButton collegeIds={colleges.map((c: any) => c.id)} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-2xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 border-b border-gray-200 w-40"></th>
              {colleges.map((c: any) => (
                <th key={c.id} className="text-left p-4 border-b border-gray-200 font-semibold text-gray-900">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row) => (
              <tr key={row.key} className="hover:bg-gray-50/50">
                <td className="p-4 border-b border-gray-200 text-sm text-gray-500 font-medium">{row.label}</td>
                {colleges.map((c: any) => (
                  <td key={c.id} className="p-4 border-b border-gray-200 text-sm text-gray-900">
                    {row.key === "rating" ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {row.format ? row.format(c[row.key]) : c[row.key]}
                      </span>
                    ) : (
                      row.format ? row.format(c[row.key]) : c[row.key] || "—"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
