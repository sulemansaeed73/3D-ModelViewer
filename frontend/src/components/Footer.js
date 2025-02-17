import React from "react";
import Image from "next/image";
import logo from "../components/assets/logo.jpg";
function Footer() {
  return (
    // <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center border-t mt-7">
    //   <div>
    //     <Image src={logo} width={80} height={80} alt="logo"></Image>
    //   </div>
    //   <div>
    //     <ul className="text-center">
    //       <li>Home</li>
    //       <li>About</li>
    //       <li>Contact</li>
    //     </ul>
    //   </div>
    //   <div><p className="text-2xl">NewsLetter</p>
    //   <input className="p-2 rounded bg-slate-600" placeholder="Email"/>      </div>
    // </div>

      <div className="block md:flex justify-between items-center p-6 bg-gray-800 text-white">
        <div className="flex-shrink-0 mx-28">
          <Image src={logo} alt="Logo" className="w-32" />
        </div>

        <ul className="flex space-x-6">
          <li>
            <p className="hover:text-gray-400">Home</p>
          </li>
          <li>
            <p className="hover:text-gray-400">About</p>
          </li>
          <li>
            <p className="hover:text-gray-400">Contact</p>
          </li>
        </ul>

        <div className="flex flex-col items-end">
          <p className="mb-2">Subscribe to our newsletter</p>
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-md text-black"
          />
          <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md">
            Subscribe
          </button>
        </div>
      </div>
 
  );
}

export default Footer;
