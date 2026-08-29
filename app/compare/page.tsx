import SaveComparisonButton from "./SaveComparisonButton";

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
        <p className="text-gray-500">Select 2–3 colleges from the listing page to compare.</p>
      </div>
    );
  }

  const colleges = await getCompareColleges(searchParams.ids);

  if (!colleges || colleges.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Compare Colleges</h1>
        <SaveComparisonButton collegeIds={colleges.map((c: any) => c.id)} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b w-40"></th>
              {colleges.map((c: any) => (
                <th key={c.id} className="text-left p-3 border-b font-semibold">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="p-3 border-b text-sm text-gray-500 font-medium">{row.label}</td>
                {colleges.map((c: any) => (
                  <td key={c.id} className="p-3 border-b text-sm">
                    {row.format ? row.format(c[row.key]) : c[row.key] || "—"}
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
