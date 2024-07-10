import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Logo from '@/assets/logo.png'
import AnimatedHamburgerButton from "./AnimatedHamburgerButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/allProducts", label: "Plants" },
    { href: "/dashboard", label: "Dashboard" }
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true)
    }
    else {
      setColor(false)
    }
  }
  window.addEventListener('scroll', changeColor)

  return (
    <div className={color ? 'w-full h-[8ch] flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50 bg-[rgba(0,0,0,0.85)] transition-all' : 'w-full h-[7ch] flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50'}>
      {/* Logo section */}
      <Link to="/" className="mr-16">
        <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
      </Link>

      {/* Toggle button */}
      {/* <button
        onClick={handleClick}
        className="flex-1 md:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-center justify-end"
      >
        {open ? (
          <LiaTimesSolid className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button> */}
      <div className="flex-1 md:hidden ease-in-out duration-300 flex items-center justify-end">
        <AnimatedHamburgerButton handleClick={handleClick}
        />
      </div>

      {/* Navigation links */}
      <div
        className={`${open
          ? "flex absolute top-14 left-0 w-full h-auto md:h-auto md:relative"
          : "hidden"
          } flex-1 md:flex flex-col md:flex-row gap-x-5 gap-y-2 md:items-center md:p-0 sm:p-4 p-4 justify-between md:bg-transparent bg-darkBrown md:shadow-none shadow-md rounded-md`}
      >
        <ul className="list-none flex md:items-center items-start gap-x-5 gap-y-1 flex-wrap md:flex-row flex-col text-lightGreen font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                onClick={handleClose}
                className="hover:text-paste ease-in-out duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
          <div>
            <button className="inline-flex text-primary border-0 py-2 px-6 focus:outline-none text-lightGreen hover:text-paste rounded text-lg">
              <FiShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;