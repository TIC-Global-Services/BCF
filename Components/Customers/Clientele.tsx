"use client";
import React from "react";
import Image from "next/image";
import { Logo1, Logo2 } from "@/assets/Customers/index";

const ValuableLogos = () => [
  { logo: Logo1, alt: "Logo 1", id: 1 },
  { logo: Logo1, alt: "Logo 2", id: 2 },
  { logo: Logo2, alt: "Logo 1", id: 3 },
  { logo: Logo1, alt: "Logo 2", id: 4 },
  { logo: Logo2, alt: "Logo 1", id: 5 },
  { logo: Logo1, alt: "Logo 2", id: 6 },
];

const EsteemLogos = () => [
  { logo: Logo2, alt: "Logo 1", id: 1 },
  { logo: Logo1, alt: "Logo 2", id: 2 },
  { logo: Logo2, alt: "Logo 1", id: 3 },
  { logo: Logo1, alt: "Logo 2", id: 4 },
  { logo: Logo2, alt: "Logo 1", id: 5 },
  { logo: Logo1, alt: "Logo 2", id: 6 },
];

const Clientele = () => {
  const valuableLogos = ValuableLogos();
  const esteemLogos = EsteemLogos();

  return (
    <div className="w-full overflow-hidden py-20 mb-15">
      {/* Valuable Customers Section */}
      <div className="md:mb-16">
        <div className="text-center md:mb-8 ">
          <h1 className="md:text-[54px] text-[24px] md:leading-[57px] font-heading">
            Valuable Customers
          </h1>
        </div>

        {/* Left to Right Scroll */}
        <div className="relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#EDEBE7] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#EDEBE7] to-transparent z-10" />
          <div className="flex animate-scroll-left">
            {/* First set  */}
            {valuableLogos.map((item, index) => (
              <div
                key={`valuable-1-${index}`}
                className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
              >
                <Image
                  src={item.logo}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate set */}
            {valuableLogos.map((item, index) => (
              <div
                key={`valuable-2-${index}`}
                className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
              >
                <Image
                  src={item.logo}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Esteem Customers Section */}
      <div>
        <div className="text-center md:mb-8">
          <h1 className="md:text-[54px] text-[24px] leading-[57px] font-heading">
            Esteem Customers
          </h1>
        </div>

        {/* Right to Left Scroll */}
        <div className="relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#EDEBE7] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#EDEBE7] to-transparent z-10" />
          <div className="flex animate-scroll-right">
            {/* First set */}
            {esteemLogos.map((item, index) => (
              <div
                key={`esteem-1-${index}`}
                className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
              >
                <Image
                  src={item.logo}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate set  */}
            {esteemLogos.map((item, index) => (
              <div
                key={`esteem-2-${index}`}
                className="flex-shrink-0 mx-8 w-32 h-32 flex items-center justify-center"
              >
                <Image
                  src={item.logo}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Clientele;
