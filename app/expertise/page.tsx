import Experience from "@/Components/Expertise/Experience";
import Expertise from "@/Components/Expertise/Expertise";
import Industry from "@/Components/Expertise/Industry";
import Appointment from "@/Components/Reusable/Appointment";
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
