import React, { useEffect } from "react";
import { client, feetchFeeds, urlFor } from "../sanity";
import { IoMdCloudDownload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Pin = ({ feed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const alreadySaved = !!feed?.save?.filter(
    (item) => item.postedBy?._id === user?.uid
  )?.length;
  const addToSave = async () => {
    client
      .patch(feed?._id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          userId: user?.uid,
          postedBy: {
            _type: "postedBy",
            _ref: user?.uid,
          },
        },
      ])
      .commit()
      .then(() => {
        window.location.reload();
      });
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      className="m-2 shadow-lg rounded-lg p-1 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative cursor-zoom-in w-auto 
        hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img src={urlFor(feed?.image)} alt="" className="rounded-lg w-full" />
      </div>
      <div className="pt-2 flex items-center justify-start gap-2">
        <img
          src={feed?.postedBy?.image}
          alt=""
          className="w-8 h-8 object-cover rounded-full"
        />
        <h2 className="text-md font-semibold text-slate-900">
          {feed?.postedBy?.userName}
        </h2>
      </div>
      {isHovered && (
        <div className="absolute inset-0 p-1 bg-blackOverlay animate-slide-fwd">
          <button
            type="button"
            className="absolute inset-0 bg-transparent"
            onClick={() => navigate(`/feed-details/${feed?._id}`)}
          ></button>
          <a
            href={`${feed?.image?.asset?.url}?dl`}
            className="absolute top-1 left-1"
          >
            <IoMdCloudDownload fontSize={30} className="text-primary" />
          </a>

          <div className=" absolute top-1 right-1">
            {alreadySaved ? (
              <button
                type="button"
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
              >
                {feed?.save?.length} saved
              </button>
            ) : (
              <button
                type="button"
                onClick={addToSave}
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
              >
                save
              </button>
            )}
          </div>
          <div
            className="flex justify-between items-center gap-2 
           absolute bottom-1 px-1 right-0 left-0"
          >
            {feed?.destination && (
              <a
                href={feed?.destination}
                target="_blank"
                rel="norefferer"
                onClick={(e) => e.stopPropagation()}
                className="bg-white flex items-center gap-2 text-black font-bold 
                      p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md  "
              >
                <IoArrowRedo />
                {
                  /* {destination.slice(8)} */
                  feed?.destination.length > 15
                    ? `${feed?.destination.slice(0, 15)}...`
                    : feed?.destination
                }
              </a>
            )}
            {feed?.postedBy?._id === user?.uid && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(feed?._id);
                }}
                className="bg-white p-2 opacity-70 hover:opacity-100 text-red-500 font-bold  
                  text-base rounded-full shadow-md outline-none"
              >
                <AiTwotoneDelete />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pin;
