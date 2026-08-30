import { notFound } from "next/navigation";
import SaveCollegeButton from "./SaveCollegeButton";
import BackButton from "@/app/BackButton";

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <BackButton />
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{college.name}</h1>
          <p className="text-gray-500 mt-1">{college.location}</p>
        </div>
        <SaveCollegeButton collegeId={college.id} />
      </div>

      <div className="flex flex-wrap gap-3 mt-4 mb-10">
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
          ★ {college.rating}
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          From ₹{(college.fees / 100000).toFixed(1)} LPA
        </span>
        {college.placementRate && (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            {college.placementRate}% placed
          </span>
        )}
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{college.overview}</p>
      </section>

      {college.courses?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Courses & Fees</h2>
          <div className="border rounded-2xl divide-y overflow-hidden">
            {college.courses.map((course: any) => (
              <div key={course.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  {course.duration && (
                    <p className="text-xs text-gray-500 mt-0.5">{course.duration}</p>
                  )}
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{(course.fees / 100000).toFixed(1)} LPA
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Placements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {college.avgPackage && (
            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Avg Package</p>
              <p className="font-semibold text-gray-900">₹{(college.avgPackage / 100000).toFixed(1)} LPA</p>
            </div>
          )}
          {college.highestPackage && (
            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Highest Package</p>
              <p className="font-semibold text-gray-900">₹{(college.highestPackage / 100000).toFixed(1)} LPA</p>
            </div>
          )}
          {college.placementRate && (
            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Placement Rate</p>
              <p className="font-semibold text-gray-900">{college.placementRate}%</p>
            </div>
          )}
        </div>
        {college.topRecruiters?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {college.topRecruiters.map((r: string) => (
                <span key={r} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Reviews</h2>
        {college.reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {college.reviews.map((review: any) => (
              <div key={review.id} className="border rounded-xl p-4">
                <p className="text-sm font-medium text-amber-600 mb-1">★ {review.rating}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
