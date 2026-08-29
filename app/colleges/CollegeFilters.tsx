"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CollegeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    search ? params.set("search", search) : params.delete("search");
    location ? params.set("location", location) : params.delete("location");
    params.set("page", "1");
    router.push(`/colleges?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && applyFilters()}
        className="border rounded-lg px-4 py-2 flex-1"
      />
      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && applyFilters()}
        className="border rounded-lg px-4 py-2 flex-1"
      />
      <button onClick={applyFilters} className="bg-black text-white px-6 py-2 rounded-lg">
        Search
      </button>
    </div>
  );
}
