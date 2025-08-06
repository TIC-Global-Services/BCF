import Axis from "@/components/Adaption/Axis";
import CastingGrades from "@/components/Adaption/CastingGrades";
import Innovation from "@/components/Adaption/Innovation";
import ProductLine from "@/components/Adaption/ProductLine";
import ContentSectionComponent from "@/components/Reusable/ContentSection";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="py-20">
        <ContentSectionComponent
          heading="Adapting Today."
          subheading="SHAPING TOMORROW"
          paragraph="At Bhuma Cast Factory, we embrace innovation to stay ahead of industry demands. Our commitment to technological advancement and process improvement allows us to deliver better accuracy, faster turnaround, and higher quality — all under one roof."
          linkHref="/contact"
          linkText="Contact for More"
        />
      </div>
      <Axis />
      <div className="pt-30">
        <Innovation />
      </div>
      <ProductLine />
      <CastingGrades />
    </div>
  );
};

export default page;
