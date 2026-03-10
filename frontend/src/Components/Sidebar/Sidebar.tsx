import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {

  const HomeIcon = FaHome as React.ElementType;

  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-[9999] transition-all duration-300 ease-in-out transform translate-x-0">

      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">

        <div className="flex bg-white flex-col items-stretch mt-4 w-full">

          <div className="flex flex-col list-none">

            <Link
              to="company-profile"
              className="flex items-center text-gray-600 font-bold uppercase pt-1 pb-4"
            >
              <HomeIcon size={20} />
              <h6 className="ml-3">Company Profile</h6>
            </Link>

            <Link
              to="income-statement"
              className="flex items-center text-gray-600 font-bold uppercase pt-1 pb-4"
            >
              <HomeIcon size={20} />
              <h6 className="ml-3">Income Statement</h6>
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Sidebar;