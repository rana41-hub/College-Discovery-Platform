import { notFound } from "next/navigation";
import SaveCollegeButton from "./SaveCollegeButton";

export const dynamic = "force-dynamic";

async function getCollege(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/colleges/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch college");

  const data = await res.json();
  return data.college;
}

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
  const college = await getCollege(params.id);

  if (!college) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{college.name}</h1>
          <p className="text-gray-500 mt-1">{college.location}</p>
        </div>
        <SaveCollegeButton collegeId={college.id} />
      </div>

      <div className="flex gap-6 mb-8 text-sm">
        <span>💰 ₹{college.fees.toLocaleString()}</span>
        <span>★ {college.rating} rating</span>
        {college.placementRate && <span>📈 {college.placementRate}% placed</span>}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{college.overview}</p>
      </section>

      {college.courses?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Courses Offered</h2>
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course: string) => (
              <span key={course} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {course}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Placements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {college.avgPackage && (
            <div className="border rounded-lg p-4">
              <p className="text-xs text-gray-500">Avg Package</p>
              <p className="font-semibold">₹{(college.avgPackage / 100000).toFixed(1)} LPA</p>
            </div>
          )}
          {college.highestPackage && (
            <div className="border rounded-lg p-4">
              <p className="text-xs text-gray-500">Highest Package</p>
              <p className="font-semibold">₹{(college.highestPackage / 100000).toFixed(1)} LPA</p>
            </div>
          )}
          {college.placementRate && (
            <div className="border rounded-lg p-4">
              <p className="text-xs text-gray-500">Placement Rate</p>
              <p className="font-semibold">{college.placementRate}%</p>
            </div>
          )}
        </div>
        {college.topRecruiters?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {college.topRecruiters.map((r: string) => (
                <span key={r} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {college.reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {college.reviews.map((review: any) => (
              <div key={review.id} className="border rounded-lg p-4">
                <p className="text-sm font-medium mb-1">★ {review.rating}</p>
                <p className="text-gray-700 text-sm">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
