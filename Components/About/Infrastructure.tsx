import React from "react";
import Image from "next/image";
import { INfraImage } from "../Reusable/Icons";
import Link from "next/link";

const Infrastructure = () => {
  return (
  
      <div className="flex md:flex-row flex-col max-w-6xl mx-auto md:h-[736px] md:gap-30 gap-10 xl:px-0 lg:px-5 md:px-5  px-5 md:py-0 py-10 items-center justify-center ">
        <div className="flex flex-col items-start md:space-y-5 space-y-4  ">
          <div>
            <h1 className="text-[#1F1F1F] md:text-[54px] text-[24px] md:leading-[64px] leading-[30px] ">
              Our History
            </h1>
           
          </div>

          <div>
            <p className="md:text-[16px] text-[12px] md:leading-[29px] leading-[18px] text-[#3F4348]  ">
           This company was started for Rapid-prototyping not as a small scale industry.
            </p>
          </div>

          <div>
            <Link href='/products' className="bg-[#E3DFD9] text-[#123458] md:text-[18px] text-[12px] px-5 py-3 rounded-full hover:bg-[#e8e5e2] transition-colors duration-200 ">
              Explore Our Products
            </Link>
          </div>
        </div> 

        <div className="w-full md:h-[546px] h-[233px]">
          <Image
            src={INfraImage}
            alt=""
            className="w-full h-full object-cover rounded-[32px]"
          />
        </div>
      </div>
   
  );
};

export default Infrastructure;
