import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center">
      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
        Real placement data · Side-by-side comparison
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
        Find the right college,{" "}
        <span className="text-amber-600">not just any college.</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
        Search, compare fees course-by-course, check real placement stats, and
        save the colleges you're actually considering — all in one place.
      </p>

      <div className="flex justify-center gap-3">
        <Link
          href="/colleges"
          className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Browse Colleges
        </Link>
        <Link
          href="/signup"
          className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Create Account
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 text-left">
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold text-gray-900 mb-1">Search & Filter</p>
          <p className="text-sm text-gray-500">
            Filter by location, fees, and rating to narrow down your options fast.
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold text-gray-900 mb-1">Compare Side-by-Side</p>
          <p className="text-sm text-gray-500">
            Put 2-3 colleges head-to-head on fees, placements, and ratings.
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="font-semibold text-gray-900 mb-1">Save & Revisit</p>
          <p className="text-sm text-gray-500">
            Save colleges and comparisons to your account and pick up where you left off.
          </p>
        </div>
      </div>
    </div>
  );
}
