"use client";
import React from "react";
import LandingPage from "./LandingPage";
import TwoDModel from "@/components/assets/AutoCAD2D.webp";
import ThreeDModel from "@/components/assets/3D5.webp";
import Image from "next/image";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
function Home() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-[#ca3a3a] to-[#fdf2f2] min-h-screen">
      <LandingPage />
      <h2 className="text-5xl font-bold mt-6 text-center text-gray-900 underline decoration-[#ca3a3a]">
        View in Both Dimensions
      </h2>
      <div className="flex flex-col md:flex-row p-6 gap-6 items-center">
        <div className="w-full md:w-1/2 border p-6 border-gray-300 shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            2D Model Viewer
          </h2>
          <Image
            className="rounded-lg border border-red-800 hover:scale-105 transform duration-300"
            width={350}
            height={550}
            src={TwoDModel}
            alt="2D"
          />
          <p className="mt-4 text-gray-700 leading-relaxed">
            Experience precision with our 2D DWG/DXF viewer. Easily explore
            technical drawings with smooth zooming, intuitive panning, and
            accurate measurement tools, ensuring a seamless and detailed
            analysis of your designs.
          </p>
          <button
            onClick={() => router.push("login")}
            className="w-full md:w-1/2 lg:w-1/3 mt-4 p-3 text-white text-lg font-medium bg-[#ca3a3a] hover:bg-gray-900 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2 border p-6 border-gray-300 shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            3D Model Viewer
          </h2>
          <Image
            className="rounded-lg border border-red-800 hover:scale-105 transform duration-300"
            width={350}
            height={550}
            src={ThreeDModel}
            alt="3D"
          />
          <p className="mt-4 text-gray-700 leading-relaxed">
            Step into the future of visualization with our interactive 3D model
            viewer. Load DWG/DXF files and explore designs from every
            angle—rotate, zoom, and measure with ease. Bring your blueprints to
            life in an immersive, dynamic environment.
          </p>
          <button
            onClick={() => router.push("uploadautocad")}
            className="w-full md:w-1/2 lg:w-1/3 mt-4 p-3 text-white text-lg font-medium bg-[#ca3a3a] hover:bg-gray-900 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
