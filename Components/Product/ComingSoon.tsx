"use client";

import React from "react";

const ComingSoon = () => {
  return (
    <div className="py-20">
      <div
        className="bg-black h-[84px] flex items-center overflow-hidden relative"
        aria-label="Notification: More content coming soon"
      >
        <div className="w-full" aria-hidden="true">
          <div className="inline-flex animate-marquee whitespace-nowrap text-white text-[24px] font-light">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="mx-20">
                More Coming Soon
              </span>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ComingSoon;
