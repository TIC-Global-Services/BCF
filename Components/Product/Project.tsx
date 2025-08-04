"use client";
import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dots } from "../Reusable/Icons";

const Project = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-0 md:py-20">
      <div
        className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] xl:min-h-[422px] max-w-7xl mx-auto bg-black rounded-[32px] overflow-hidden"
        ref={ref}
      >
        {/* Background dots - positioned better for all screens */}
        <div className="absolute md:top-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm sm:max-w-md md:max-w-[586px]">
          <div className="relative w-full h-auto">
            <Image
              src={Dots}
              alt="Decorative dots"
              className="w-full md:h-[404px] h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
        </div>

        {/* Main content container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12"
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <div className="text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            {/* Main heading with better responsive typography */}
            <motion.h1
              className="text-white font-heading mb-3 sm:mb-4 md:mb-6
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px]
                         leading-tight sm:leading-tight md:leading-tight lg:leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4,
              }}
            >
              Join Our Growing Customer Network
            </motion.h1>

            {/* Description with improved readability */}
            <motion.p
              className="text-[#E9E6E6] mb-6 sm:mb-8
                         text-sm sm:text-base md:text-lg lg:text-xl xl:text-[21px]
                         leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[27px]
                         max-w-2xl lg:max-w-4xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.6,
              }}
            >
              Looking for a reliable manufacturing partner? Let's work together
              to bring your vision to life — with strength, precision, and
              trust.
            </motion.p>

            {/* CTA button with better responsive sizing */}
            <motion.button
              className="bg-[#E3DFD9] text-[#123458] rounded-full font-medium
                         px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5
                         text-sm sm:text-base md:text-lg
                         hover:bg-opacity-90 hover:transform hover:scale-105
                         transition-all duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-[#E3DFD9] focus:ring-opacity-50"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.6,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact for More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
