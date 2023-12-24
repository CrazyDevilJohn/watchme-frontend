import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client, feetchFeedById, fetchFeedByCatagory, urlFor } from "../sanity";
import { IoCloudDownload, IoSendSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";

const PinDetails = () => {
  const { pinId } = useParams();
  const [feed, setFeed] = useState(null);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState(feed?.comment);
  const [isLoading, setIsLoading] = useState(false);
  const [relativePins, setRelativePins] = useState(null);
  const navigate = useNavigate();

  const fetchFeed = () => {
    setIsLoading(true);
    feetchFeedById(pinId).then((data) => {
      setFeed(data);
      setCommentsList(data?.comment);
      fetchFeedByCatagory(data).then((data) => {
        setRelativePins(data);
        console.log(data);
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });
  };

  useEffect(() => {
    fetchFeed();
  }, [pinId]);

  const handleAddComment = async (ev, isButton) => {
    if (ev?.key === "Enter" || (isButton && comment?.split("")?.length > 1)) {
      await client
        .patch(pinId)
        .setIfMissing({ comment: [] })
        .insert("after", "comment[-1]", [
          {
            _key: uuidv4(),
            comment: comment,
            postedBy: {
              _type: "postedBy",
              _ref: user?.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          setComment("");
          setTimeout(() => {
            fetchFeed();
            console.log(commentsList);
          }, 2000);
        });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      {feed && !isLoading ? (
        <div className="px-10 pt-5 grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
          <div className=" overflow-hidden rounded-xl relative">
            <img
              src={urlFor(feed?.image)}
              alt=""
              className=" h-full object-cover"
            />
          </div>
          <div className="w-full p-4">
            <div className="flex justify-between items-center">
              <a href={`${feed?.image?.asset?.url}?dl`} className="">
                <IoCloudDownload fontSize={20} className="text-slate-900" />
              </a>
              <a href={feed?.destination}>{feed?.destination?.slice(0, 24)}</a>
            </div>
            <h1 className="font-semibold text-3xl capitalize mt-2">
              {feed?.title}
            </h1>
            {/* comments */}
            <div>
              <div className="overflow-y-scroll hide_scrollbr">
                {commentsList?.map(({ comment, postedBy }, i) => (
                  <div className="mt-4 " key={i}>
                    <h3 className="font-normal capitalize text-sm">
                      {comment}
                    </h3>
                    <div className="flex items-center mt-2 justify-start gap-2">
                      <img
                        src={postedBy?.image}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <h2 className="font-semibold text-sm ml-1">
                        {postedBy?.userName}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="font-normal text-2xl capitalize mt-2">Comments</h2>
              <div className="flex mt-4 justify-start items-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="bg-mainColor mx-2 border-2 p-1 rounded-xl text-sm w-full"
                  onChange={(value) => setComment(value.target.value)}
                  onKeyDown={(ev) => handleAddComment(ev, false)}
                  value={comment}
                />
                <button
                  type="button"
                  onClick={() => handleAddComment(null, true)}
                >
                  <IoSendSharp fontSize={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex  justify-start items-center">
          <Spinner />
        </div>
      )}
      {feed && !isLoading && (
        <div className="flex flex-col items-start justify-center">
          {/* relaative pins */}
          <h1 className="text-center mt-10 text-2xl font-semibold">
            More Like This
          </h1>
          <div>
            {relativePins && relativePins?.length > 0 ? (
              relativePins?.map((pin) => (
                <button
                  type="button"
                  onClick={() => navigate(`/feed-details/${pin?._id}`)}
                >
                  <div className="m-2 shadow-lg rounded-lg p-1 relative overflow-hidden">
                    <div
                      className="relative  w-auto 
        hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      <img
                        src={urlFor(pin?.image)}
                        alt=""
                        className="rounded-lg w-full"
                      />
                    </div>
                    <div className="pt-2 flex items-center justify-start gap-2">
                      <img
                        src={pin?.postedBy?.image}
                        alt=""
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <h2 className="text-md font-semibold text-slate-900">
                        {pin?.postedBy?.userName}
                      </h2>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="w-full h-full">
                <h1 className="text-2xl">no relaative posts</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinDetails;
