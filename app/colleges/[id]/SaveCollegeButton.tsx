"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SaveCollegeButton({ collegeId }: { collegeId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    fetch("/api/saved/colleges")
      .then((res) => res.json())
      .then((data) => {
        const isSaved = data.saved?.some((s: any) => s.collegeId === collegeId);
        setSaved(!!isSaved);
      });
  }, [session, collegeId]);

  const toggleSave = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    if (saved) {
      await fetch(`/api/saved/colleges/${collegeId}`, { method: "DELETE" });
      setSaved(false);
    } else {
      await fetch("/api/saved/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });
      setSaved(true);
    }
    setLoading(false);
  };

  if (status === "loading") return null;

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
    >
      {saved ? "🔖 Saved" : "🔖 Save"}
    </button>
  );
}
