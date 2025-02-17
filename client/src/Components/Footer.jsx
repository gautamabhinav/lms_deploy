import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <>
      {/* adding the footer */}
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
        {/* adding copyright section */}
        <section className="text-lg">
          Copyright {year} | All Rights Reserved
        </section>

        {/* adding the social media section */}
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <Link
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsFacebook />
          </Link>
          <Link
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsInstagram />
          </Link>
          <Link
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsTwitter />
          </Link>
          <Link
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsLinkedin />
          </Link>
        </section>
      </footer>
    </>
  );
};

export default Footer;
