"use client";
import React from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AppointmentBGImage, AppointmentMobileBGImage } from './Icons'

const Appointment = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false, 
    margin: "-100px"
  })

  return (
    <div className='relative max-w-7xl mx-auto md:mb-0 xl:px-0 lg:px-5 md:px-5 ' ref={ref}>
      <div className="hidden md:block">
        <Image
          src={AppointmentBGImage}
          alt='Appointment Background'
          className='w-full h-full object-cover rounded-[28px]'
        />
      </div>
      
      {/* Mobile Image */}
      <div className="md:hidden px-5 relative">
        <Image
          src={AppointmentMobileBGImage}
          alt='Appointment Background Mobile'
          className='w-full h-[662px] object-cover rounded-[28px]'
        />
      </div>
      
      <motion.div
        className='absolute md:bottom-10 md:left-10 bottom-5 left-5 md:max-w-md max-w-[calc(100%-40px)] text-white md:pl-0 pl-5'
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <motion.h1
          className='md:text-[54px] text-[28px] font-heading md:mb-0 mb-1'
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.4
          }}
        >
          Book Appointment
        </motion.h1>
        <motion.p
          className='md:text-[21px] text-[12px] md:leading-[27px] leading-[18px] md:mb-6 mb-3'
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6
          }}
        >
          To Deliver Exceptional products and services backed by advanced technology,
          Consistently exceeding client expectations across industries
        </motion.p>
        <motion.button
          className="bg-[#E3DFD9] md:text-[18px] text-[12px] text-[#123458] font-medium py-3 px-6 rounded-full 
                     hover:bg-[#e8e5e2] transition-colors duration-200 cursor-pointer"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.8
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Appointment
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Appointment