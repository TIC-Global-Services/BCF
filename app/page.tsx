import Ferrous from "@/components/Home/Ferrous";
import Foundation from "@/components/Home/Foundation";
import Hero from "@/components/Home/Hero";
import Appointment from "@/components/Reusable/Appointment";
import ContentSectionComponent from "@/components/Reusable/ContentSection";
import RollingGallery from "@/components/ui/RollingGallery";


export default function Home() {
  return (
    <div>
      <Hero/>
      <div className="py-20">
        <ContentSectionComponent
          heading="Welcome to"
          subheading="Bhuma Cast Factory"
          paragraph="At Bhuma Cast Factory, we are leading manufacturers and wholesale suppliers of premium-quality iron products. With a robust distribution network and decades of industry experience, we’re equipped to fulfill bulk requirements across Tamil Nadu and beyond, ensuring consistent supply and reliable service.
We offer a comprehensive range of iron castings and fabricated components, catering to both industrial and construction-grade applications. "
          linkHref="/about"
          linkText="More About Us"
          maxWidth="699px"
          letterSpacing="-2px"
        />
      </div>
      <RollingGallery/>
      <Foundation />
      <Ferrous />
      <Appointment />
    </div>
  );
}
