import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BackButton from "@/app/BackButton";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const userId = (session.user as any).id;

    const [savedColleges, savedComparisons] = await Promise.all([
        prisma.savedCollege.findMany({
            where: { userId },
            include: { college: true },
            orderBy: { createdAt: "desc" },
        }),
        prisma.savedComparison.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        }),
    ]);

    const allComparisonIds = Array.from(
        new Set(savedComparisons.flatMap((c) => c.collegeIds))
    );
    const comparisonColleges = await prisma.college.findMany({
        where: { id: { in: allComparisonIds } },
        select: { id: true, name: true },
    });
    const collegeNameMap = new Map(comparisonColleges.map((c) => [c.id, c.name]));

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <BackButton fallbackHref="/colleges" />
            <h1 className="text-3xl font-bold mb-8 tracking-tight text-gray-900">Saved Items</h1>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Saved Colleges</h2>
                {savedColleges.length === 0 ? (
                    <p className="text-gray-500">
                        No saved colleges yet.{" "}
                        <Link href="/colleges" className="underline text-gray-700 hover:text-black">
                            Browse colleges
                        </Link>
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {savedColleges.map((saved) => (
                            <Link
                                key={saved.id}
                                href={`/colleges/${saved.college.id}`}
                                className="group border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all bg-white block"
                            >
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:underline decoration-1 underline-offset-2">
                                    {saved.college.name}
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">{saved.college.location}</p>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-600">
                                        From ₹{(saved.college.fees / 100000).toFixed(1)} LPA
                                    </span>
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        ★ {saved.college.rating}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Saved Comparisons</h2>
                {savedComparisons.length === 0 ? (
                    <p className="text-gray-500">
                        No saved comparisons yet.{" "}
                        <Link href="/colleges" className="underline text-gray-700 hover:text-black">
                            Select colleges to compare
                        </Link>
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {savedComparisons.map((comparison) => (
                            <Link
                                key={comparison.id}
                                href={`/compare?ids=${comparison.collegeIds.join(",")}`}
                                className="block border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all bg-white"
                            >
                                <p className="font-medium text-gray-900">
                                    {comparison.collegeIds
                                        .map((id) => collegeNameMap.get(id) || "Unknown college")
                                        .join(" vs ")}
                                </p>
                                <p className="text-gray-500 text-xs mt-2 bg-gray-50 inline-block px-2 py-1 rounded-md">
                                    Saved {new Date(comparison.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}