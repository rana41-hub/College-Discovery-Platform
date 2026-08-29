"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SaveComparisonButton({ collegeIds }: { collegeIds: string[] }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/saved/comparisons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collegeIds }),
    });
    setLoading(false);

    if (res.ok) setSaved(true);
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
    >
      {saved ? "✓ Saved" : "🔖 Save Comparison"}
    </button>
  );
}
