import React, { useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import { fetchFeedByFilterCatagory } from "../sanity";
import { useParams } from "react-router-dom";

const Category = () => {
  const [feeds, setFeeds] = useState(null);
  const { category } = useParams();
  console.log(category);

  useEffect(() => {
    fetchFeedByFilterCatagory(category).then((data) => {
      setFeeds(data);
      console.log(data);
    });
  }, [category]);

  return (
    <div>
      {feeds && feeds?.length > 0 ? (
        <MasonryLayout feeds={feeds} />
      ) : (
        <div>
          <h2 className="text-center text-2xl">No {category} images found!!</h2>
        </div>
      )}
    </div>
  );
};

export default Category;
