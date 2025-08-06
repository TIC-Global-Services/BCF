import Experience from "@/components/Expertise/Experience";
import Expertise from "@/components/Expertise/Expertise";
import Industry from "@/components/Expertise/Industry";
import Appointment from "@/components/Reusable/Appointment";
import React from "react";

const page = () => {
  return (
    <div>
      <Experience />
      <Expertise />
      <Industry />
      <Appointment />
    </div>
  );
};

export default page;
