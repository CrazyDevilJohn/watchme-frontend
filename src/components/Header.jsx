import React, { useState } from "react";
import { MainLogo } from "../assets";
import {
  BiSearchAlt,
  BiPlus,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { RiHome7Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { categories } from "../utils/supports";
import { NavLink, useNavigate } from "react-router-dom";

const isNotActiveStyle =
  "flex items-center px-2 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-extrabold   transition-all duration-200 ease-in-out capitalize";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [isScroll, setScroll] = useState(false);
  const navigate = useNavigate();

  const scrollOnClick = (side) => {
    setScroll(true);
    side === "right"
      ? (document.getElementById("category").scrollLeft += 200)
      : (document.getElementById("category").scrollLeft -= 200);
    document.getElementById("category").scrollLeft < 199
      ? setScroll(false)
      : setScroll(true);
  };

  const handleSearch = (ev) => {
    if (ev.key === "Enter") {
      if (searchText === "") setSearchText("*");
      navigate(`/search/:${searchText}`);
    }
  };

  return (
    <div>
      <div className="w-screen px-2 py-1  h-14 flex justify-between items-center gap-2 bg-mainColor">
        <img
          src={MainLogo}
          alt=""
          className="h-8 w-auto object-contain cursor-pointer"
        />

        <div className="flex justify-between items-center w-full bg-white p-2 shadow-md rounded-lg mx-4">
          <BiSearchAlt fontSize={30} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none px-3 text-gray-800 font-semibold text-base"
            onKeyDown={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => navigate("/new-pin/")}
          className="h-10 w-10 p-2 flex justify-center items-center bg-black cursor-pointer rounded-md shadow-md"
        >
          <BiPlus fontSize={30} className="text-white" />
        </button>
        <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
      </div>

      <div className="flex items-center w-auto h-10  hide_scrollbar relative">
        <div className="flex items-center w-ful py-2 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHome7Fill fontSize={30} />
          </NavLink>

          <div className="h-6 w-[1px] bg-slate-500"></div>
        </div>
        <div
          className={`${
            isScroll ? "flex" : "hidden"
          } absolute left-0 w-10 h-10  justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
          onClick={() => scrollOnClick("left")}
          id="leftSide"
        >
          <BiChevronLeft fontSize={30} />
        </div>
        <div
          className="hide_scrollbr flex items-center w-full overflow-hidden hide_scrollbar scroll-smooth duration-150 ease-in-out"
          id="category"
        >
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        <div
          className="absolute right-0 w-10 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer "
          onClick={() => scrollOnClick("right")}
        >
          <BiChevronRight fontSize={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;
