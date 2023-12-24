import React, { useEffect, useState } from "react";
import { feetchFeeds } from "../sanity.js";
import MasonryLayout from "./MasonryLayout.jsx";

function Feeds() {
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    feetchFeeds().then((data) => setFeeds(data));
  }, []);
  
  return (
    <div className="w-full h-full">
      <MasonryLayout feeds={feeds} />
    </div>
  );
}

export default Feeds;
