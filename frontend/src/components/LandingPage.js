"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileView from "@/components/assets/MobileView.jpg";
import LaptopView from "@/components/assets/LaptopView.png";
function LandingPage() {
  const router = useRouter();
  return (
    <div>
      <div className="relative">
        <Image
          className="hidden md:block w-full h-[600px] object-cover lg:object-fill"
          src={LaptopView}
          alt="LandingPic"
        />
        <Image
          className="md:hidden w-full h-[600px] object-cover lg:object-fill"
          src={MobileView}
          alt="LandingPic"
        />
       <div className="mt-[65px] md:mt-0 absolute inset-0 p-6 flex flex-col md:justify-center text-gray-100 bg-black/40  items-center md:items-start">
      <p className="max-w-sm md:w-1/2 lg:w-1/3 font-extrabold leading-tight p-4 mt-4 bg-[#ca3a3a] text-white text-4xl rounded-lg shadow-lg text-center md:text-left">
        Explore Stunning 2D & 3D Models
      </p>
      <button
        onClick={() => router.push("login")}
        className="w-[50%] md:w-1/4 lg:w-1/6 p-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 text-center"
      >
        Get Started
      </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
