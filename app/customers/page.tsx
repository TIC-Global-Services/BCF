import Clientele from "@/components/Customers/Clientele";
import CustomerBento from "@/components/Customers/CustomerBento";
import GrowNetwork from "@/components/Customers/GrowNetwork";
import ContentSectionComponent from "@/components/Reusable/ContentSection";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="py-20">
        <ContentSectionComponent
          heading="Partners in Progress."
          subheading="FOUNDATIONS OF OUR GROWTH"
          paragraph="At Bhuma Cast Factory, our customers are more than clients — they’re collaborators in our journey of engineering excellence. We are proud to serve a diverse base of companies across industries who rely on our expertise, consistency, and commitment to quality."
          linkHref="/contact"
          linkText="Contact for More"
          maxWidth="1048px"
        />
      </div>
      <CustomerBento />
      <Clientele />
      <GrowNetwork />
    </div>
  );
};

export default page;
