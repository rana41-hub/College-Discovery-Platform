"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallbackHref = "/colleges" }: { fallbackHref?: string }) {
  const router = useRouter();

  const handleBack = () => {
    // If there's history to go back to, use it; otherwise go to a sensible default
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back
    </button>
  );
}
