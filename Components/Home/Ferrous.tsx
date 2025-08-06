"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { FEImage, MetalImage } from "@/assets/Home/index";

const contents = [
  {
    title: "Ferrous",
    desc: "At BCF, we specialize in casting materials tailored to meet your specific requirements. Our expertise lies in ferrous materials, including:",
    bullet1: "Cast Iron Grades: 150-250, 200-300, 250-350",
    bullet2: "Ductile Iron Grades: 400/15, 400/12, 400/18, 500/7, 600/3",
    bullet3: "Austempered Ductile Iron",
    endDesc:
      "With our commitment to precision and quality, we ensure that every casting meets the highest industry standards.",
  },
  {
    title: "Non-Ferrous",
    desc: "We are also well-regarded for our expertise in non-ferrous castings. Our capabilities include: ",
    bullet1: "Aluminum Grades:LM 4, LM6, LM25, ADC1 and more",
    bullet2:
      "Copper and copper-Alloy Castings: Brass, Aluminum Bronze, and other copper-integrated alloys",
    bullet3: "Zinc Castings",
    endDesc: "With our Proficiency in both ferrous and non-ferrous materials",
  },
];

const Ferrous = () => {
  const desktopIconRef = useRef<HTMLDivElement | null>(null);
  const mobileIconRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Animate desktop icon
    if (desktopIconRef.current) {
      gsap.to(desktopIconRef.current, {
        rotation: 360,
        duration: 19,
        repeat: -1,
        ease: "none",
      });
    }

    // Animate mobile icon
    if (mobileIconRef.current) {
      gsap.to(mobileIconRef.current, {
        rotation: 360,
        duration: 19,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  const handleNavigation = () => {
    if (currentIndex === 0) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentContent = contents[currentIndex];

  return (
    <section className="flex flex-col md:flex-row justify-center items-end w-full max-w-7xl mx-auto gap-10 p-6 py-40 overflow-hidden">
      {/* Left Section with Heading and Decorative Images */}
      <div className="relative w-full md:w-[545px] md:h-[592px] h-[230px] bg-[#F2F0F0] mb-8 md:mb-0 rounded-xl">
        <h1 className="font-heading text-[24px] md:text-[54px] md:leading-14 relative px-4 md:px-6 pt-4 md:pt-13">
          Our Expertise in <br /> Metallurgy
        </h1>

        {/* Metal Image - Top Right (Desktop) */}
        <div
          ref={desktopIconRef}
          className="absolute top-[-27%] -right-[10%] md:-right-[27%] hidden md:block"
        >
          <Image
            src={MetalImage}
            alt="Decorative metal illustration"
            className="w-[250px] h-[250px] md:w-[329px] md:h-[329px]"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* FE Image - Bottom Left */}
        <div className="absolute -bottom-45 -left-10 md:-left-5">
          <Image
            src={FEImage}
            alt="Decorative FE illustration"
            className="w-[380px] h-[380px] md:w-[580px] md:h-[580px]"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Right Section with Content */}
      <div className="w-full md:w-1/2 max-w-2xl md:mt-0 mt-10 relative">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            {currentContent.title}
          </h2>

          <p className="md:text-[16px] text-[10px] text-[#5B5353]">{currentContent.desc}</p>

          <div className="space-y-2 list-disc md:text-[16px] text-[10px] text-[#5B5353]">
            <p>{currentContent.bullet1}</p>
            <p>{currentContent.bullet2}</p>
            <p>{currentContent.bullet3}</p>
          </div>

          <p className="md:text-[16px] text-[10px] text-[#5B5353]">{currentContent.endDesc}</p>
        </div>

        <div className="flex flex-row justify-between items-center w-full relative">
          <button
            onClick={handleNavigation}
            aria-label={currentIndex === 0 ? "Next content" : "Previous content"}
            className="mt-8 bg-transparent rounded-full hover:bg-gray-100 transition-colors duration-200 border border-[#8D8D93] w-[75px] h-[71px] flex items-center justify-center cursor-pointer"
          >
            {currentIndex === 0 ? (
              <BsArrowRight className="w-[25px] h-[25px] text-[#8D8D93]" />
            ) : (
              <BsArrowLeft className="w-[25px] h-[25px] text-[#8D8D93]" />
            )}
          </button>

          {/* Metal Image - Mobile Version */}
          <div ref={mobileIconRef} className="md:hidden">
            <Image
              src={MetalImage}
              alt="Decorative metal illustration"
              className="w-[200px] h-[200px]"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ferrous;