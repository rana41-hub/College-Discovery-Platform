import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Saved Items</h1>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Saved Colleges</h2>
                {savedColleges.length === 0 ? (
                    <p className="text-gray-500">
                        No saved colleges yet.{" "}
                        <Link href="/colleges" className="underline">
                            Browse colleges
                        </Link>
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedColleges.map((saved) => (
                            <Link
                                key={saved.id}
                                href={`/colleges/${saved.college.id}`}
                                className="border rounded-xl p-5 hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-semibold">{saved.college.name}</h3>
                                <p className="text-gray-500 text-sm">{saved.college.location}</p>
                                <div className="flex justify-between items-center mt-3 text-sm">
                                    <span>₹{saved.college.fees.toLocaleString()}</span>
                                    <span>★ {saved.college.rating}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Saved Comparisons</h2>
                {savedComparisons.length === 0 ? (
                    <p className="text-gray-500">
                        No saved comparisons yet.{" "}
                        <Link href="/colleges" className="underline">
                            Select colleges to compare
                        </Link>
                    </p>
                ) : (
                    <div className="space-y-3">
                        {savedComparisons.map((comparison) => (
                            <Link
                                key={comparison.id}
                                href={`/compare?ids=${comparison.collegeIds.join(",")}`}
                                className="block border rounded-xl p-4 hover:shadow-lg transition-shadow"
                            >
                                <p className="font-medium">
                                    {comparison.collegeIds
                                        .map((id) => collegeNameMap.get(id) || "Unknown college")
                                        .join(" vs ")}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
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