"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IndustryImage } from "../Reusable/Icons";

const Industry = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const workSteps = [
    {
      title: "Automotive & Transport",
      description:
        "We manufacture high-strength iron components for vehicles and heavy transport systems, ensuring durability and performance under tough conditions.",
    },
    {
      title: "Construction & Infrastructure",
      description:
        "We manufacture high-strength iron components for vehicles and heavy transport systems, ensuring durability and performance under tough conditions.",
    },
    {
      title: "Energy & Utilities",
      description:
        "We manufacture high-strength iron components for vehicles and heavy transport systems, ensuring durability and performance under tough conditions.",
    },
    {
      title: "Equipment Manufacturing",
      description:
        "We manufacture high-strength iron components for vehicles and heavy transport systems, ensuring durability and performance under tough conditions.",
    },
  ];

  return (
    <div ref={ref} className="md:mt-[50px] mb-10 px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50, x: 0 }}
        animate={
          isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: 0 }
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="flex flex-col items-center"
      >
        <h1 className="md:text-[54px] text-[24px] font-heading text-[#1F1E1D]">
          Industry - Specific Knowledge
        </h1>
        <div className="text-[#3F4348] md:text-[16px] text-[12px]  md:leading-[29px] leading-[20px] md:text-start text-center  tracking-[1px]">
          Our deep understanding of industry applications allows us to cater to
          a wide range of sectors including:
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.4,
        }}
        className="flex flex-col lg:flex-row justify-center items-stretch gap-0 lg:gap-6 max-w-7xl mx-auto md:mt-15 mt-5"
      >
        {/* Image Container - 60% width - Only visible on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.6,
          }}
          className="w-full lg:w-[60%] hidden lg:block"
        >
          <Image
            src={IndustryImage}
            alt="Industry applications"
            className="w-full rounded-[20px] h-[530px] object-cover"
          />
        </motion.div>

        {/* Accordion Container - 40% width on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.8,
          }}
          className="w-full lg:w-[40%] lg:h-[530px] flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-center space-y-5">
            {workSteps.map((content, index) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  className={`bg-[#EDEDEF] rounded-xl cursor-pointer transition-all duration-500 ${
                    activeIndex === index
                      ? "bg-black px-2"
                      : "bg-[#EDEDEF] py-5 px-2"
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  <div className="flex items-center md:p-4 p-3 space-x-3">
                    <h1
                      className={`md:text-[20px] font-medium ${
                        activeIndex === index
                          ? "text-[#DCDCDA]"
                          : "text-[#000000]"
                      }`}
                    >
                      {content.title}
                    </h1>
                  </div>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        key={`content-${index}`}
                        className="overflow-hidden"
                      >
                        <p className="text-[16px] text-[#DCDCDA] p-3 md:p-4 pt-0 sm:pt-0">
                          {content.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Mobile Image - Shows below active accordion item */}
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key={`image-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="lg:hidden mt-4 overflow-hidden"
                    >
                      <Image
                        src={IndustryImage}
                        alt="Industry applications"
                        className="w-full rounded-[20px] h-[300px] object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Industry;