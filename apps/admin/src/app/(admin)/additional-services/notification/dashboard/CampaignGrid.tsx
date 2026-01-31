'use client';

import React from 'react';

interface Campaign {
  id: string;
  title: string;
  purpose: string;
  channels: string[];
  recipients: number;
  success: number;
  failed: number;
  status: string;
  sentAt: string;
}

interface Props {
  campaigns: Campaign[];
  onViewDetail: (id: string) => void;
}

export default function CampaignGrid({ campaigns, onViewDetail }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white font-sans shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8fafc] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#5C8D5A]"></div>
          <h2 className="text-[12px] font-black uppercase text-gray-800">Recent Notification Campaigns</h2>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-[#5C8D5A] hover:underline">
          View All History
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-tighter text-gray-500">
            <tr>
              <th className="px-5 py-3">캠페인 명칭</th>
              <th className="px-5 py-3">목적</th>
              <th className="px-5 py-3">발송 채널</th>
              <th className="px-5 py-3">수신인원</th>
              <th className="px-5 py-3 text-center">성공/실패</th>
              <th className="px-5 py-3">상태</th>
              <th className="px-5 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px]">
            {campaigns.map(camp => (
              <tr key={camp.id} className="group transition-colors hover:bg-gray-50/50">
                <td className="px-5 py-4 font-black text-gray-800">{camp.title}</td>
                <td className="px-5 py-4">
                  <span className="rounded-[4px] border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold uppercase text-gray-500">
                    {camp.purpose}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5">
                    {camp.channels.map(ch => (
                      <div
                        key={ch}
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-100 bg-white text-gray-400 group-hover:border-[#5C8D5A]/30 group-hover:text-[#5C8D5A]"
                      >
                        <i
                          className={`ri-${ch === 'kakao' ? 'kakao-talk' : ch === 'sms' ? 'message-3' : 'group'}-fill text-xs`}
                        ></i>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 font-mono font-bold text-gray-600">{camp.recipients.toLocaleString()}명</td>
                <td className="px-5 py-4 text-center">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-black">
                    <span className="text-emerald-600">{camp.success}</span>
                    <span className="text-gray-200">/</span>
                    <span className="text-red-500">{camp.failed}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${camp.status === 'done' ? 'bg-emerald-500' : 'bg-orange-400'}`}
                    ></span>
                    <span className="text-[11px] font-black uppercase text-gray-700">{camp.status}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => onViewDetail(camp.id)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[10px] font-black text-gray-600 transition-all hover:border-[#5C8D5A] hover:text-[#5C8D5A] active:scale-95"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
