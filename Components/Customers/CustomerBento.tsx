import React from "react";
import Image from "next/image";
import {
  onTimeLogo,
  ScalableLogo,
  StraightImage,
  TransparentImage,
} from "@/assets/Customers/index";

const CustomerBento = () => {
  return (
    <div>
      <h1 className="text-center text-[#1F1E1D] md:text-[54px] text-[24px] md:leading-[57px] font-heading mb-10">
        What Our Customers Value Most
      </h1>
      {/* MObile version */}
      <div className="md:hidden px-4">
        <div className="flex w-full gap-3">
          {/* First column */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col justify-between p-5 bg-white h-[158px] rounded-[12px]">
              <Image src={onTimeLogo} alt="" className="w-6 h-6" />
              <p className="text-[10px] leading-[18px] font-light">
                On-Time Delivery across city and state
              </p>
            </div>

            <div className="flex flex-col justify-between p-5 bg-white h-[158px] rounded-[12px]">
              <Image src={ScalableLogo} alt="" className="w-6 h-6" />
              <p className="text-[10px] leading-[15px] font-light">
                Scalable Production Capabilities
              </p>
            </div>
          </div>

          {/* Second column */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-end items-end bg-black text-white rounded-[12px] h-[94px] p-5">
              <p className="text-[10px] leading-[15px] font-light">
                Tailored Casting & Machining Solution
              </p>
            </div>

            <div className="relative h-[159px] overflow-hidden rounded-[12px]">
              <Image
                src={TransparentImage}
                alt="Image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[10px] leading-[15px] font-light text-white ">
                  Transparent Communication & Support
                </p>
              </div>
            </div>

            <div className="relative h-[94px] overflow-hidden rounded-[12px]">
              <Image
                src={StraightImage}
                alt="Image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[10px] leading-[15px] font-light text-white ">
                  Straight Quality Control
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-center items-start max-w-4xl mx-auto gap-4 pb-20 xl:px-0 lg:px-0 md:px-5 ">
          {/* First col */}
          <div className="flex flex-col justify-between p-5 bg-white h-[336px] w-full rounded-[12px]">
            <Image src={onTimeLogo} alt="" className="w-12 h-12" />
            <p className="text-[20px] leading-[30px] font-light">
              On-Time Delivery across city and state
            </p>
          </div>

          {/* Second col */}
          <div className="flex flex-col justify-center w-full gap-4">
            <div className="flex justify-end items-end bg-black text-white rounded-[12px] h-[182px] p-5 w-full">
              <p className="text-[20px] leading-[30px] font-light">
                Tailored Casting & Machining Solution
              </p>
            </div>

            <div className="relative h-[263px] w-full overflow-hidden rounded-[12px]">
              <Image
                src={TransparentImage}
                alt="Image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[20px] leading-[30px] font-light text-white ">
                  Transparent Communication & Support
                </p>
              </div>
            </div>
          </div>

          {/* third col */}
          <div className="flex flex-col justify-center w-full gap-4">
            <div className="flex flex-col justify-between p-5 bg-white h-[336px] w-full rounded-[12px]">
              <Image src={ScalableLogo} alt="" className="w-12 h-12" />
              <p className="text-[20px] leading-[30px] font-light">
                Scalable Production Capabilities
              </p>
            </div>

            <div className="relative h-[182px] w-full overflow-hidden rounded-[12px]">
              <Image
                src={StraightImage}
                alt="Image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[20px] leading-[30px] font-light text-white">
                  Straight Quality Control
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBento;
