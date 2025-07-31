import React from "react";
import Image from "next/image";
import { AxisImage } from "../Reusable/Icons";

const Axis = () => {
  return (
    <div className="bg-white">
      <div className="flex md:flex-row flex-col max-w-6xl mx-auto md:h-[736px] md:gap-30 gap-10 xl:px-0 lg:px-5 md:px-5  px-5 md:py-0 py-10 items-center justify-center ">
        <div className="flex flex-col items-start md:space-y-7 space-y-4  ">
          <div>
            <h1 className="text-[#1F1F1F] md:text-[54px] text-[24px] md:leading-[64px] leading-[30px] ">
              5th Axis Machining
            </h1>
            <p className="text-[#3F4348] md:text-[16px] text-[12px] md:leading-[22px] leading-[18px]">
              Unmatched Precision for Complex Components
            </p>
          </div>

          <div>
            <p className="md:text-[16px] text-[12px] md:leading-[29px] leading-[18px] text-[#3F4348] max-w-6xl">
              At Bhuma Cast Factory, we embrace innovation to stay ahead of
              industry demands. Our commitment to technological advancement and
              process improvement allows us to deliver better accuracy, faster
              turnaround, and higher quality — all under one roof.
            </p>
          </div>

          <div>
            <button className="bg-[#F1EFEC] text-[#123458] md:text-[18px] text-[12px] px-4 py-2 rounded-full ">
              More About Us
            </button>
          </div>
        </div>

        <div className="w-full md:h-[546px] h-[233px]">
          <Image
            src={AxisImage}
            alt=""
            className="w-full h-full object-cover rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Axis;
