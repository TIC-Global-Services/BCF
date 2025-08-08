import React from "react";
import Image from "next/image";
import {
  BoilerImage,
  HydraImage,
  StraightImage,
} from "@/Assets/Customers/index";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { JetImage } from "@/Assets/Adaption";

const contents = [
  { image: BoilerImage, name: "Boiler Bolt" },
  { image: StraightImage, name: "Strainer" },
  { image: JetImage, name: "Jet Nozzle" },
  { image: HydraImage, name: "Hydraculics" },
];

const ProductLine = () => {
  return (
    <div className="flex flex-col md:space-y-15 space-y-8 items-center  max-w-7xl mx-auto py-30 xl:px-0 lg:px-5 md:px-5 px-5">
      <div>
        <h1 className="md:text-[54px] text-[24px] font-heading text-center">
          Our Innovative Product Line
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {contents.map((item, index) => (
          <div className="relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              className="md:h-[382px] h-[242pxx] w-full object-cover rounded-[18px]"
            />
            <div className="absolute bottom-0 left-0 w-full  bg-opacity-90 px-4 py-3 flex md:flex-row flex-col md:items-center items-start justify-between">
              <p className="text-white text-sm xl:text-[44px] lg:text-[35px] md:text-[28px] text-[20px] font-medium">
                {item.name}
              </p>
              <LuArrowUpRight className="md:w-9 md:h-9 w-6 h-6 text-[#1C1B1F] bg-[#F5F5F5]  rounded-full p-1" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          href="/products"
          className="bg-[#E3DFD9] md:text-[18px] text-[12px] text-[#123458] font-medium py-3 px-6 rounded-full 
                     hover:bg-[#e8e5e2] transition-colors duration-200 cursor-pointer"
        >
          View More Product
        </Link>
      </div>
    </div>
  );
};

export default ProductLine;
