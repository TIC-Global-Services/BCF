"use client";
import React, { useState } from "react";
import { MdLocationPin as Location } from "react-icons/md";
import { FaPhone as Phone } from "react-icons/fa6";
import { IoMailOpen as Mail } from "react-icons/io5";

const HaveAQuery = () => {
  const contactDetails = [
    {
      title: "Call Center",
      icon: Phone,
      desc: "+919790939890",
    },
    {
      title: "Our Company Address",
      icon: Location,
      desc: "09 Siruthondar Street Manavalanagar Tiruvallur - 602002",
    },

    {
      title: "E-mail Address",
      icon: Mail,
      desc: "castfactory2021@gmail.com",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus("Error: Name is required.");
      return false;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setStatus("Error: A valid email is required.");
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus(""); // Clear status on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzoec1lIzhfBW8yIWb3qMWEsEVImrUoJHXvsBDFbwzyUft7HsGi5dpoi3wdLHURuTbR/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors", // Use no-cors to bypass CORS restrictions
        }
      );

      // With no-cors, we can't read the response body, but if the request doesn't throw, assume success
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Error: Unable to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Section: Title and Contact Details */}
        <div className="lg:w-[60%] flex flex-col gap-6 justify-between">
          <div>
            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[54px] leading-[64px] font-heading text-[#151414]">
              Have Questions? We Have Answers!
            </h1>
            <p className="text-[14px] sm:text-[16px] text-gray-600 mt-2 max-w-lg">
              Fill in the form or contact us. Our team will get back to you
              shortly.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-center ">
            {contactDetails.map((detail, index) => (
              <div key={index} className="flex items-center md:gap-1 gap-3">
                <div className="bg-[#F1EFEC] rounded-full p-3 inline-flex items-center justify-center">
                  <detail.icon className="w-6 h-6 text-[#1F1F1F]" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#151414]">
                    {detail.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] text-gray-600">
                    {detail.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="lg:w-[40%] mt-8 lg:mt-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-black"
          >
            <div className="flex flex-col ">
              <label>E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Insert Your E-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-[#E8E8E8] rounded-[20px] focus:outline-none  text-[14px] sm:text-[16px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Product</label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Select Product"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-[#E8E8E8] rounded-[20px] focus:outline-none  text-[14px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Message</label>

              <textarea
                id="message"
                name="message"
                placeholder="Insert a Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-[#E8E8E8] rounded-[20px] focus:outline-none  text-[14px] sm:text-[16px] resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#1F1F1F] text-white w-full  h-[48px] rounded-[20px] font-medium text-[14px] sm:text-[16px] transition-colors duration-300 mt-2 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-opacity-90 "
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`text-[14px] sm:text-[16px] mt-2 ${
                  status.includes("Error") ? "text-red-600" : "text-[#005F20]"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HaveAQuery;
