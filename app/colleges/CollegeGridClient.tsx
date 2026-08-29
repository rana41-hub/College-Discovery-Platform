"use client";

import { useState } from "react";
import Link from "next/link";
import CompareBar from "./CompareBar";

export default function CollegeGridClient({ colleges }: { colleges: any[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="group border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all relative bg-white"
          >
            <label className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={selected.includes(college.id)}
                onChange={() => toggle(college.id)}
                className="w-4 h-4 accent-black cursor-pointer"
              />
            </label>

            <Link href={`/colleges/${college.id}`}>
              <h2 className="font-semibold text-lg pr-6 text-gray-900 group-hover:underline decoration-1 underline-offset-2">
                {college.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{college.location}</p>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  From ₹{(college.fees / 100000).toFixed(1)} LPA
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-700">
                  ★ {college.rating}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <CompareBar selected={selected} />
    </>
  );
}
