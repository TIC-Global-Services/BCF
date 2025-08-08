import { ExpBanner } from "@/Assets/Expertise";
import Experience from "@/Components/Expertise/Experience";
import Expertise from "@/Components/Expertise/Expertise";
import Industry from "@/Components/Expertise/Industry";
import Appointment from "@/Components/Reusable/Appointment";
import Hero from "@/Components/Reusable/HeroContainer";
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
