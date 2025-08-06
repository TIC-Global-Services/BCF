"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/Products";
import ContentSectionComponent from "@/Components/Reusable/ContentSection";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// TypeScript interfaces
interface ProductDescription {
  id: number;
  image: string;
  title: string;
  desc: string;
}

interface Product {
  id: number;
  productName: string;
  productImage: string;
  heading: string;
  subHeading: string;
  headingDescription: string;
  maxWidth: string;
  description: ProductDescription[];
}

const ProductDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [currentContent, setCurrentContent] = useState({
    title: "",
    desc: "",
    image: "",
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const lastActiveIndexRef = useRef(0);

  const product = products.find((p) => p.id === productId) as
    | Product
    | undefined;

  useEffect(() => {
    if (product && product.description.length > 0) {
      const firstDesc = product.description[0];
      setCurrentContent({
        title: firstDesc.title,
        desc: firstDesc.desc,
        image: firstDesc.image,
      });
      setActiveIndex(0);
      lastActiveIndexRef.current = 0;
    }
  }, [product]);

  // Function to update content smoothly
  const updateContent = (index: number) => {
    if (!product || index === lastActiveIndexRef.current) return;

    const desc = product.description[index];
    if (!desc) return;

    // Update the active index
    setActiveIndex(index);
    lastActiveIndexRef.current = index;

    // Create smooth transition animation
    const tl = gsap.timeline();

    // Fade out current content
    tl.to([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.15,
      ease: "power2.out",
    })
      // Scale down image slightly
      .to(
        imageRef.current,
        {
          scale: 0.95,
          opacity: 0.7,
          duration: 0.15,
          ease: "power2.out",
        },
        0
      )
      // Scale line
      .to(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0
      )
      // Update content and fade in
      .call(() => {
        setCurrentContent({
          title: desc.title,
          desc: desc.desc,
          image: desc.image,
        });
      })
      .to([titleRef.current, descriptionRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
      // Restore image
      .to(
        imageRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 1.12,
          ease: "back.out(1.2)",
        },
        "-=0.1"
      )
      // Restore line
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.15"
      );
  };

  useEffect(() => {
    if (!product || !containerRef.current) return;

    const descriptions = product.description;
    const totalDescriptions = descriptions.length;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Create ScrollTrigger for content switching
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * totalDescriptions}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        // Calculate current index based on scroll progress
        const progress = self.progress;
        const exactIndex = progress * (totalDescriptions - 1);
        const currentIndex = Math.round(exactIndex);
        const validIndex = Math.min(
          Math.max(currentIndex, 0),
          totalDescriptions - 1
        );

        // Update content if index changed
        if (validIndex !== lastActiveIndexRef.current) {
          updateContent(validIndex);
        }
      },
    });

    // Set initial styles with proper defaults
    gsap.set([titleRef.current, descriptionRef.current], {
      opacity: 1,
      y: 0,
    });
    gsap.set(imageRef.current, {
      scale: 1,
      opacity: 1,
    });
    gsap.set(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [product]);

  // Handle window resize with proper cleanup
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner with Product Image */}
      <div className="relative h-[100dvh] overflow-hidden">
        <Image
          src={product.productImage}
          alt={product.productName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Product Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="max-w-8xl mx-auto">
            <h1 className="text-[82px] leading-[88px] font-bodoni text-white">
              {product.productName}
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <ContentSectionComponent
          heading={product.heading}
          subheading={product.subHeading}
          paragraph={product.headingDescription}
          maxWidth={product.maxWidth}
          linkHref="/contact"
          linkText="Contact for More"
        />
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        style={{ height: "100vh" }}
      >
        <div className="h-full flex flex-col lg:flex-row items-center justify-center">
          {/* Title Section - Left */}
          <div className="flex-1 space-y-4 flex flex-col justify-start items-start pb-30">
            <h2
              ref={titleRef}
              className="text-[44px] leading-[57px] font-heading text-gray-900 capitalize "
              style={{
                position: "relative",
                willChange: "transform, opacity",
              }}
            >
              {currentContent.title}
            </h2>
          </div>

          {/* Image Section - Middle */}
          <div className="flex-1 w-full lg:w-auto flex justify-center">
            <div
              ref={imageRef}
              className="relative h-64 sm:h-72 lg:h-80 xl:h-96 w-full max-w-sm lg:max-w-md overflow-hidden rounded-lg"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                key={`${currentContent.image}-${activeIndex}`}
                src={currentContent.image}
                alt={currentContent.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 33vw"
                priority // Add priority for better loading
              />
            </div>
          </div>

          {/* Description Section - Right */}
          <div className="flex-1 space-y-4 flex flex-col justify-end pt-40">
            <div
              ref={lineRef}
              className="w-[60px] h-1 bg-[#123458] rounded-full"
              style={{
                transformOrigin: "left center",
                willChange: "transform",
              }}
            ></div>
            <p
              ref={descriptionRef}
              className="md:text-[14px] text-gray-600 leading-relaxed"
              style={{ willChange: "transform, opacity" }}
            >
              {currentContent.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
