'use client';
import React from 'react';

export default function ListView({ filteredPrograms, getCategoryInfo, openProgramDetail }: any) {
  return (
    <div className="space-y-3">
      {filteredPrograms.map((p: any) => {
        const info = getCategoryInfo(p.category);
        return (
          <div
            key={p.id}
            onClick={() => openProgramDetail(p.id)}
            className="cursor-pointer rounded-lg border-l-4 bg-white p-5"
            style={{ borderLeftColor: info.color }}
          >
            <h3 className="font-bold">{p.title}</h3>
            <p className="mt-2 text-gray-600">{p.description}</p>

            <div className="mt-2 flex gap-4 text-sm text-gray-500">
              <span>
                <i className="ri-calendar-line" /> {p.date}
              </span>
              <span>
                <i className="ri-time-line" /> {p.start_time} - {p.end_time}
              </span>
              <span>
                <i className="ri-user-line" /> {p.staff}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
