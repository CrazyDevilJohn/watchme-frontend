import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFeedBySearch } from "../sanity";
import MasonryLayout from "./MasonryLayout";

const Search = () => {
  const { query } = useParams();
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    fetchFeedBySearch(query).then((data) => {
      setFeeds(data);
      console.log(data);
    });
  }, [query]);

  return (
    <div>
      {feeds && feeds?.length > 0 ? (
        <MasonryLayout feeds={feeds} />
      ) : (
        <div>
          <h2 className="text-center text-2xl">No {query} images found!!</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
