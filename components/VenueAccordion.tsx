"use client";

import { useState } from "react";

interface Tab {
  title: string;
  content: string;
}

export function VenueAccordion({ tabs }: { tabs: Tab[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {tabs.map((tab, i) => (
        <div key={tab.title} className="overflow-hidden rounded-lg border border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="flex w-full items-center justify-between bg-white px-6 py-4 text-left font-heading font-bold text-dark-bg transition-colors hover:bg-gray-50"
          >
            {tab.title}
            <svg
              className={`h-5 w-5 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === i && (
            <div className="border-t border-gray-200 bg-white px-6 py-4">
              <p className="leading-relaxed text-gray-dark">{tab.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
