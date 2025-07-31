"use client";
import React, {  useRef } from "react";
import Image from "next/image";
import { motion, useInView } from 'framer-motion';
import { LeftWall, RightWall } from "../Reusable/Icons";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <div ref={ref} className="relative flex flex-row justify-between items-center md:h-[647px] h-[550px] mt-30 mb-30">
      <motion.div
        key="text-container"
        initial={{ opacity: 0, y: 50, x: 0 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2
        }}
        className="absolute top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center"
      >
        <h1 className="text-[#1F1E1D] xl:text-[64px] lg:text-[40px] md:text-[30px] text-[32px] xl:leading-[67px] lg:leading-[50px] leading-[40px] font-heading md:mb-2 xl:tracking-0 lg:tracking-0 md:tracking-1 tracking-[-2px] whitespace-nowrap">
          Crafted by Experience.
        </h1>
        <h2 className="text-[#1F1E1D] xl:text-[64px] lg:text-[40px] md:text-[30px] text-[32px] xl:leading-[67px] lg:leading-[50px] leading-[40px] font-bodoni font-normal mb-2">
          Perfected by Skill
        </h2>
        <p className="text-[#3F4348] md:text-[16px] text-[12px] md:leading-[29px] leading-[23px] xl:max-w-xl lg:max-w-md md:max-w-sm mx-auto font-inter mb-4">
          Founded in [Year], Bhuma Cast Factory started as a rapid prototyping
          venture with a clear goal — to deliver high-quality, reliable
          solutions for India's growing industries.
        </p>
        <button
          type="button"
          className="bg-[#F1EFEC] md:text-[18px] text-[12px] text-[#123458] md:px-6 px-4 md:py-3 py-2 rounded-[63px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123458] transition cursor-pointer hover:scale-105 "
        >
          Explore Our Products
        </button>
      </motion.div>

      <motion.div
        key="left-wall"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.4
        }}
        className="absolute left-0"
      >
        <Image src={LeftWall} alt="" className="w-[40vw]" />
      </motion.div>

      <motion.div
        key="right-wall"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.4
        }}
        className="absolute right-0"
      >
        <Image src={RightWall} alt="" className="w-[40vw]" />
      </motion.div>
    </div>
  );
};

export default Experience;