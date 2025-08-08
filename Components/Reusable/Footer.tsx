"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@/Assets/Footer/Socials/index";
import { motion } from "framer-motion";
import Container from "./Container";

const socialLinks = [
  { image: InstagramLogo, link: "#" },
  { image: FacebookLogo, link: "#" },
  { image: LinkedinLogo, link: "#" },
];

const quickLinks = [
  { name: "About Us", link: "/about" },
  { name: "Expertise", link: "/expertise" },
  { name: "Adaption", link: "/adaption" },
  { name: "Products", link: "/products" },
  { name: "Customers", link: "/customers" },
  { name: "Contact Us", link: "/contact" },
];

const legalContent = [
  { name: "Terms & Condition", link: "#" },
  { name: "Privacy & Policy", link: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <footer className="md:h-[381px] flex md:flex-row flex-col justify-between items-start md:py-0 py-5 mx-auto mt-20">

        <div className="order-3 md:order-1">
          <h1 className="text-[#18171A] font-heading xl:text-[120px] lg:text-[110px] md:text-[70px] text-[54px] xl:leading-[125px] lg:leading-[90px] md:leading-[70px] leading-[50px] xl:max-w-3xl lg:max-w-3xl md:max-w-md max-w-md md:mb-9 mb-5 md:mt-0 mt-2">
            BHUMA CAST FACTORY
          </h1>
          <div className="flex md:flex-row flex-col justify-start md:items-center items-start md:gap-10 gap-3">
            @ {currentYear} Bhuma Cast Factory
            <div className="flex flex-row gap-3">
              {socialLinks.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-[#F1EFEC] w-10 h-10 flex items-center justify-center rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={item.image}
                    alt="social media logo"
                    className="w-[16px] h-[16px]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col text-[#121215] order-1 md:order-2 mb-5 md:mb-0">
          <h1 className="text-[18px] font-semibold mb-2">Quick Links</h1>
          <div className="flex flex-col">
            {quickLinks.map((item, index) => (
              <motion.div
                key={index}
                className="text-[16px] font-regular leading-[43px]"
                whileHover={{ x: 5 }}
              >
                <Link
                  href={item.link}
                  className="hover:text-[#000000] transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col text-[#121215] md:order-3 order-2">
          <h1 className="text-[18px] font-semibold mb-2">Legal</h1>
          <div className="flex flex-col">
            {legalContent.map((item, index) => (
              <motion.div
                key={index}
                className="text-[16px] font-regular leading-[43px]"
                whileHover={{ x: 5 }}
              >
                <Link
                  href={item.link}
                  className="hover:text-[#000000] transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
