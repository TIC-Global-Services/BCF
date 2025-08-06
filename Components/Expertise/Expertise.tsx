"use client";

import React, { useRef, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { Icon1, Icon2, Icon3, Icon4, Icon5, IconWhite1, IconWhite2, IconWhite3, IconWhite4, IconWhite5 } from '@/assets/Expertise/index';

// Types
interface ExpertiseItem {
  title: string;
  description: string;
  icon?: StaticImageData | string;
  iconWhite?: StaticImageData | string;
}

interface CardProps {
  item: ExpertiseItem;
  isInView: boolean;
  index: number;
  totalItems: number;
}

// Constants
const EXPERTISE_DATA: ExpertiseItem[] = [
  { 
    title: 'Areas of Expertise', 
    description: "Delivering Precision, Performance & Reliability." 
  },
  {
    icon: Icon1, 
    iconWhite: IconWhite1,
    title: 'Iron Casting & Fabrication', 
    description: "There are many variati of passages of engineer's available have suffered."
  },
  {
    icon: Icon2, 
    iconWhite: IconWhite2,
    title: 'Custom Product Development', 
    description: "There are many variati of passages of engineer's available have suffered."
  },
  {
    icon: Icon3, 
    iconWhite: IconWhite3,
    title: 'Tooling & Manufacturing', 
    description: "There are many variati of passages of engineer's available have suffered."
  },
  {
    icon: Icon4, 
    iconWhite: IconWhite4,
    title: 'Quality Control & Testing', 
    description: "There are many variati of passages of engineer's available have suffered."
  },
  {
    icon: Icon5, 
    iconWhite: IconWhite5,
    title: 'End to End Manufacturing', 
    description: "There are many variati of passages of engineer's available have suffered."
  }
];

// Animation configurations - optimized and consolidated
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as Variants,
  
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as Variants,
  
  cardHover: {
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  
  iconHover: { 
    scale: 1.1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  
  header: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.8 }
  }),
  
  cardContent: (delay = 0.2) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.5 }
  })
} as const;

// Utility functions
const getCardClasses = (index: number, totalItems: number): string => {
  const baseClasses = "md:px-8 md:py-8 px-2 py-4 rounded-[20px] md:h-[352px] flex flex-col transition-colors duration-300";
  
  if (index === 0) return `${baseClasses} justify-start hidden md:flex`;
  if (index === totalItems - 1) return `${baseClasses} justify-between col-span-2 md:col-span-1 group border border-[#D9D9D9] hover:bg-black`;
  return `${baseClasses} justify-between group border border-[#D9D9D9] hover:bg-black`;
};

// Card Component
const Card: React.FC<CardProps> = React.memo(({ item, isInView, index, totalItems }) => {
  const cardClasses = useMemo(() => getCardClasses(index, totalItems), [index, totalItems]);
  const [isHovered, setIsHovered] = useState(false);
  
  const isHeaderCard = index === 0;
  
  return (
    <motion.div
      variants={ANIMATIONS.card}
      whileHover={ANIMATIONS.cardHover}
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHeaderCard ? (
        <>
          <motion.h1 
            className="text-[54px] font-light text-[#1F1E1D] leading-14 mb-4 font-heading"
            {...ANIMATIONS.fadeIn(0.3)}
            animate={isInView ? ANIMATIONS.fadeIn(0.3).animate : ANIMATIONS.fadeIn(0.3).initial}
          >
            {item.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-[#3F4348]"
            {...ANIMATIONS.fadeIn(0.5)}
            animate={isInView ? ANIMATIONS.fadeIn(0.5).animate : ANIMATIONS.fadeIn(0.5).initial}
          >
            {item.description}
          </motion.p>
        </>
      ) : (
        <>
          <motion.div 
            className="md:mb-6 mb-3 min-w-[121px]"
            whileHover={ANIMATIONS.iconHover}
          >
            {item.icon && item.iconWhite && (
              <Image
                src={isHovered ? item.iconWhite : item.icon}
                alt={item.title}
                className="md:w-[40px] md:h-[40px] w-[20px] h-[20px]"
                width={40}
                height={40}
              />
            )}
          </motion.div>
          <div className='md:w-full'>
            <motion.h3 
              className="md:text-[20px] text-[16px] font-semibold text-black group-hover:text-white md:mb-3"
              {...ANIMATIONS.cardContent()}
              animate={isInView ? ANIMATIONS.cardContent().animate : ANIMATIONS.cardContent().initial}
            >
              {item.title}
            </motion.h3>
            <motion.p 
              className="md:text-[16px] text-[10px] text-black group-hover:text-white"
              {...ANIMATIONS.cardContent(0.3)}
              animate={isInView ? ANIMATIONS.cardContent(0.3).animate : ANIMATIONS.cardContent(0.3).initial}
            >
              {item.description}
            </motion.p>
          </div>
        </>
      )}
    </motion.div>
  );
});

Card.displayName = 'Card';

// Mobile Header Component
const MobileHeader: React.FC<{ isHeaderInView: boolean }> = React.memo(({ isHeaderInView }) => (
  <motion.div 
    className="mb-12 text-center md:hidden"
    initial={ANIMATIONS.header.initial}
    animate={isHeaderInView ? ANIMATIONS.header.animate : ANIMATIONS.header.initial}
    transition={ANIMATIONS.header.transition}
  >
    <h1 className="text-[24px] font-heading text-[#1F1E1D] mb-2">
      Areas of Expertise
    </h1>
    <p className="text-[16px] text-[#3F4348]">
      Delivering Precision, Performance & Reliability
    </p>
  </motion.div>
));

MobileHeader.displayName = 'MobileHeader';

// Main Component
const Expertise: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-50px" });

  return (
    <div className="max-w-7xl mx-auto xl:px-0 px-[30px] md:-mt-0 -mt-50">
      <div ref={headerRef}>
        <MobileHeader isHeaderInView={isHeaderInView} />
      </div>
      
      <motion.div 
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4"
        variants={ANIMATIONS.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {EXPERTISE_DATA.map((item, index) => (
          <Card
            key={`expertise-${index}`}
            item={item}
            isInView={isInView}
            index={index}
            totalItems={EXPERTISE_DATA.length}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Expertise;