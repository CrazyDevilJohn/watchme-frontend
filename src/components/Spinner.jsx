import React from "react";
import { Loader } from "../assets";

const Spinner = () => {
  return (
    <div className="w-full h-full items-center justify-center flex">
      <img src={Loader} className="w-275 " alt="" />
    </div>
  );
};

export default Spinner;
