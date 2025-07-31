"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

interface ContentSectionProps {
  heading: string;
  subheading?: string;
  paragraph?: string;
  linkText?: string;
  linkHref?: string;
  maxWidth?: string;
}

const ContentSectionComponent: React.FC<ContentSectionProps> = ({ 
  heading, 
  subheading, 
  paragraph, 
  linkText,
  linkHref,
  maxWidth = "720px" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }}
      className="flex flex-col justify-center items-center  mx-auto md:px-0 px-5" style={{ maxWidth }}
    >
      <h1 className="text-[#1F1E1D] md:text-[64px] text-[32px] font-heading md:leading-[84px] leading-[40px] text-center md:mb-1 mb-2">
        {heading}
      </h1>
      {subheading && (
        <h2 className="text-[#1F1E1D] md:text-[64px] text-[32px] font-bodoni font-regular md:leading-[84px] text-center leading-[40px] md:mb-1 mb-2">
          {subheading}
        </h2>
      )}
      {paragraph && (
        <p className="md:text-[16px] text-[12px] text-[#3F4348] md:leading-[29px] leading-[23px] text-center">
          {paragraph}
        </p>
      )}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="mt-6 px-6 py-3 md:text-[18px] text-[12px] bg-[#F1EFEC] text-[#123458] rounded-full hover:bg-opacity-90 transition-colors duration-200"
        >
          {linkText}
        </Link>
      )}
    </motion.div>
  );
};

export default ContentSectionComponent;