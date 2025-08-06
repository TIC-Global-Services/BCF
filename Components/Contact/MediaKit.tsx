"use client";
import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MediaKitImage } from "@/assets/Contact/index";

const MediaKit = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });

  return (
    <div className="xl:px-0 lg:px-5 md:px-5 px-5 md:mt-0 mt-10 py-10">
      <div className="relative max-w-7xl mx-auto md:mb-0 xl:px-0" ref={ref}>
        <div className="relative">
          <Image
            src={MediaKitImage}
            alt="Innovation Background"
            className="w-full xl:h-full  h-[421px] object-cover rounded-[28px]"
          />
          <div className="absolute inset-0 bg-black opacity-25 rounded-3xl" />

          {/* Content container with responsive alignment */}
          <motion.div
            className="absolute inset-0 flex md:items-end md:justify-end items-start justify-start"
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <div className="md:text-right text-left text-white md:p-10 p-5 max-w-xl">
              <motion.h1
                className="xl:text-[54px] lg:text-[40px] text-[28px] font-heading md:mb-4 mb-2"
                initial={{ y: 50, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.4,
                }}
              >
                Download Media Kit
              </motion.h1>
              <motion.p
                className="text-[#E9E6E6] xl:text-[21px] lg:text-[18px] md:text-[18px] text-[12px] md:leading-[27px] leading-[18px]"
                initial={{ y: 50, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.6,
                }}
              >
                We frequently put out brand communications, featuring inspiring
                stories that define our journey. Explore them in our media kit.
              </motion.p>
              <button className="mt-6 px-6 py-3 md:text-[18px] text-[12px] bg-[#E3DFD9] text-[#123458] rounded-full hover:bg-opacity-90 transition-colors duration-200">
                Download Here
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MediaKit;
