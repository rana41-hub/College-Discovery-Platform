"use client";

import { useRouter } from "next/navigation";

export default function CompareBar({ selected }: { selected: string[] }) {
  const router = useRouter();

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
      <span className="text-sm">{selected.length} selected</span>
      <button
        disabled={selected.length < 2}
        onClick={() => router.push(`/compare?ids=${selected.join(",")}`)}
        className="bg-white text-black px-4 py-1.5 rounded-full text-sm disabled:opacity-40"
      >
        Compare
      </button>
    </div>
  );
}
