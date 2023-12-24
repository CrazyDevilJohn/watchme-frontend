import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Pin } from "../components";


const breakPontsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 3,
  500: 1,
};

const MasonryLayout = ({ feeds }) => {
  return (
    <Masonry
      className="w-full h-full flex animate-slide-fwd"
      breakpointCols={breakPontsObj}
    >
      {feeds?.map((feed) => {
        return <Pin feed={feed} key={feed?._id} />;
      })}
    </Masonry>
  );
};

export default MasonryLayout;
