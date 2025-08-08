import { AboutBanner } from "@/assets/About";
import { ExpBanner } from "@/assets/Expertise";
import Experience from "@/components/Expertise/Experience";
import Expertise from "@/components/Expertise/Expertise";
import Industry from "@/components/Expertise/Industry";
import Appointment from "@/components/Reusable/Appointment";
import Hero from "@/components/Reusable/HeroContainer";
import React from "react";
export const heroContent = {
  title: ['Expertise'],
  buttonText: 'Contact Us',
  backgroundImage: ExpBanner.src,
}

const page = () => {
  return (
    <div>
      <Hero content={heroContent} />
      <Experience />
      <Expertise />
      <Industry />
      <Appointment />
    </div>
  );
};

export default page;
