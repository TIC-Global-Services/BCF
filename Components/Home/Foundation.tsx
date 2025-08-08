"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MissionIcon,
  MissionImage,
  ValueIcon,
  ValueImage,
  VisionIcon,
  VisionImage,
} from "@/Assets/Home/index";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";

const contents = [
  {
    logo: MissionIcon,
    name: "Our Mission",
    desc: "To Deliver Exceptional products and services backed by advanced technology, Consistently exceeding client expectations across industries",
    image: MissionImage,
  },
  {
    logo: VisionIcon,
    name: "Our Vision",
    desc: "To deliver exceptional products and services backed by advanced technology, consistently exceeding client expectations across industries.",
    image: VisionImage,
  },
  {
    logo: ValueIcon,
    name: "Our Value",
    desc: "We believe quality is the cornerstone of success. At Bhuma Cast Factory and nurturing long-term business partnerships.",
    image: ValueImage,
  },
];

const Foundation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLeftSide, setIsLeftSide] = useState(false);

  const handleMouseMove = (e: { currentTarget: any; clientX: number; clientY: number; }) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if mouse is within the container bounds
    const isWithinBounds =
      x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    if (isWithinBounds) {
      setMousePosition({ x, y });
      // Determine if mouse is on left or right side
      setIsLeftSide(x < rect.width / 2);
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  };

  const handleMouseLeave = (e: { currentTarget: any; clientX: number; clientY: number; }) => {
    // Double check if mouse has actually left the container
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isOutside = x < 0 || x > rect.width || y < 0 || y > rect.height;

    if (isOutside) {
      setShowArrows(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? contents.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === contents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentContent = contents[currentIndex];

  return (
    <div className="flex md:flex-row flex-col space-y-5 justify-between items-start md:h-[707px] h-full w-full max-w-7xl mx-auto overflow-hidden md:mt-10 md:mb-20 xl:px-0 lg:px-5 md:px-5 px-5">
      <div className="flex flex-col md:space-y-6 space-y-3">
        <h1 className="text-[#030303] md:text-[54px] text-[24px] font-heading leading-[100%]">
          Foundation of <br /> Bhuma Cast Factory
        </h1>
        <p className="md:text-[16px] text-[10px] md:leading-[29px] max-w-lg">
            Established with a vision to deliver precision in iron casting and fabrication, Bhuma Cast Factory stands on a legacy of quality and trust. Built by industry experts, our foundation is rooted in innovation, reliability, and customer satisfaction.
        </p>
      </div>

      <div className="flex flex-col justify-between h-full md:items-end items-center">
        <motion.div
          className="bg-white md:h-[617px] md:w-[604px] rounded-[16px] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Half */}
          <div className="h-1/2 md:space-y-5 py-8 pl-5">
            <motion.div
              className="bg-black p-3 md:rounded-[19px] rounded-[10px] inline-flex"
              key={`icon-${currentIndex}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
              }}
            >
              <Image
                src={currentContent.logo}
                alt="Icon"
                className="md:w-[44px] md:h-[44px] w-[22px] h-[22px] object-contain"
              />
            </motion.div>

            <motion.h1
              className="md:text-[42px] text-[24px] leading-[57px] text-black"
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {currentContent.name}
            </motion.h1>

            <motion.p
              className="text-[#363030] md:text-[16px] text-[10px] md:leading-[27px]"
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentContent.desc}
            </motion.p>
          </div>

          {/* Bottom Half (Image) */}
          <div
            className="h-1/2 relative overflow-hidden"
            style={{ cursor: "none" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={isLeftSide ? handlePrevious : handleNext}
          >
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
              style={{ cursor: "none" }}
            >
              <Image
                src={currentContent.image}
                alt="Images"
                className="w-full h-full object-cover rounded-b-[16px]"
                style={{ cursor: "none" }}
              />
            </motion.div>

            <AnimatePresence>
              {showArrows && (
                <motion.div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[30px] shadow-lg flex gap-5 p-1.5"
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    cursor: "none",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3,
                  }}
                >
                  {/* Left Arrow Button - Active when on left side */}
                  <motion.button
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      isLeftSide
                        ? "hover:bg-gray-100 cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    onClick={isLeftSide ? handlePrevious : undefined}
                    disabled={!isLeftSide}
                    whileHover={
                      isLeftSide
                        ? {
                            scale: 1.1,
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={isLeftSide ? { scale: 0.95 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <LuArrowLeft className="w-4 h-4" />
                  </motion.button>

                  {/* Right Arrow Button - Active when on right side */}
                  <motion.button
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      !isLeftSide
                        ? "hover:bg-gray-100 cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    onClick={!isLeftSide ? handleNext : undefined}
                    disabled={isLeftSide}
                    whileHover={
                      !isLeftSide
                        ? {
                            scale: 1.1,
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={!isLeftSide ? { scale: 0.95 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <LuArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="bg-white flex items-center justify-between gap-5 py-1 px-2 rounded-3xl shadow-sm mb-2 md:mt-0 mt-5">
          <button onClick={handlePrevious} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <LuArrowLeft className="w-5 h-5 text-black cursor-pointer" />
          </button>
          <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <LuArrowRight className="w-5 h-5 text-black cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foundation;
