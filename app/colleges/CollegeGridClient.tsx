"use client";

import { useState } from "react";
import Link from "next/link";
import CompareBar from "./CompareBar";

export default function CollegeGridClient({ colleges }: { colleges: any[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border rounded-xl p-5 hover:shadow-lg transition-shadow relative"
          >
            <label className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={selected.includes(college.id)}
                onChange={() => toggle(college.id)}
                className="w-4 h-4"
              />
            </label>

            <Link href={`/colleges/${college.id}`}>
              <h2 className="font-semibold text-lg pr-6">{college.name}</h2>
              <p className="text-gray-500 text-sm">{college.location}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm">₹{college.fees.toLocaleString()}</span>
                <span className="text-sm font-medium">★ {college.rating}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <CompareBar selected={selected} />
    </>
  );
}
