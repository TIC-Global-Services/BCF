"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { products } from "@/data/Products";

// TypeScript interfaces
interface ProductDescription {
  title: string;
  desc: string;
}

interface Product {
  id: number;
  productName: string;
  productImage: string | StaticImageData;
  description?: ProductDescription[];
}

interface ProductCardProps {
  product: Product;
  isFullWidth?: boolean;
  onClick: () => void;
}

const Products: React.FC = () => {
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[44px] leading-[57px] font-heading text-center text-[#1F1E1D] mb-4 max-w-lg mx-auto   ">
            Built with Purpose. Delivered with Precision.
          </h1>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          {/* Row 1: Full width single product - Mining Sector */}
          <ProductCard
            product={products[0]}
            isFullWidth={true}
            onClick={() => handleProductClick(products[0].id)}
          />

          {/* Row 2: Two products side by side */}
          <div className="grid grid-cols-2 gap-8">
            <ProductCard
              product={products[1]}
              onClick={() => handleProductClick(products[1].id)}
            />
            <ProductCard
              product={products[2]}
              onClick={() => handleProductClick(products[2].id)}
            />
          </div>

          {/* Row 3: Two products side by side */}
          <div className="grid grid-cols-2 gap-8">
            <ProductCard
              product={products[3]}
              onClick={() => handleProductClick(products[3].id)}
            />
            <ProductCard
              product={products[4]}
              onClick={() => handleProductClick(products[4].id)}
            />
          </div>

          {/* Row 4: Full width single product - Automobiles */}
          <ProductCard
            product={products[5]}
            isFullWidth={true}
            onClick={() => handleProductClick(products[5].id)}
          />
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFullWidth = false,
  onClick,
}) => {
  return (
    <div
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isFullWidth ? "w-full" : ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className=" rounded-2xl shadow-lg overflow-hidden h-full">
        {/* Image Section */}
        <div
          className={`relative overflow-hidden ${
            isFullWidth ? "h-80 lg:h-96" : "h-64"
          }`}
        >
          <Image
            src={product.productImage}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes={isFullWidth ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
          />

          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Arrow icon that appears on hover */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiArrowUpRight />
          </div>

          {/* Product Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="md:text-[44px] leading-[100%]  text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {product.productName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
