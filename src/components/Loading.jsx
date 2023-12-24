import React from "react";
import Lottie from "lottie-react";
import animatedLoder from "../assets/Animation - 1702748862685.json";

function Loding() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={animatedLoder} loop={true} />
    </div>
  );
}

export default Loding;
