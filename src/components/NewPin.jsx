import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiCloudUpload } from "react-icons/bi";
import { categories } from "../utils/supports";
import { client, uploadAsset } from "../sanity";

const NewPin = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestinestion] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user);

  const handleFileSelect = (ev) => {
    const file = ev.target.files[0];
    uploadAsset(file).then((data) => setImage(data));
  };

  console.log(image?.url);

  const savePin = () => {
    if (category && title && destination && about) {
      const __doc = {
        _type: "pin",
        title: title,
        about: about,
        destination: destination,
        image: {
          asset: {
            _type: "reference",
            _ref: image?._id,
          },
        },
        category: category,
        userid: user?.uid,
        postedBy: {
          _type: "postedBy",
          _ref: user?.uid,
        },
      };
      client.create(__doc).then(() => {
        console.log("done  upload");
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center">
      <h1 className="font-semibold text-2xl my-4 ">Add New Pin</h1>
      <div className="px-5 mt-4 w-full h-full flex justify-start items-center flex-col">
        <UserInput
          placeholder={"Title for pin"}
          setValue={setTitle}
          value={title}
        />
        <div className="my-2 w-full flex items-center justify-start">
          <img
            src={user?.photoURL}
            alt=""
            className="w-10 h-10 object-cover rounded-full shadow-sm shadow-slate-500"
          />
          <h1 className="text-md ml-3">{user?.displayName}</h1>
        </div>
        <UserInput
          placeholder={"About this pin"}
          setValue={setAbout}
          value={about}
        />
        <UserInput
          placeholder={"Destinetion of this pin"}
          setValue={setDestinestion}
          value={destination}
        />
        <div className="w-full h-20 ">
          <select
            onChange={(ev) => {
              setCategory(ev.target.value);
            }}
            className="w-full h-10 rounded-md capitalize"
          >
            {categories?.map(({ name }) => {
              return <option value={name}>{name}</option>;
            })}
          </select>
        </div>
        {image ? (
          <div
            className="w-auto
            cursor-pointer
            h-510
            bg-secondaryColor
            rounded-lg
            overflow-hidden
            shadow-xl
            shadow-slate-700 object-cover"
          >
            <img src={image?.url} alt="" className="w-full h-full" />
          </div>
        ) : (
          <label className="w-full cursor-pointer h-510  bg-secondaryColor  rounded-lg overflow-hidden shadow-xl shadow-slate-700">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col justify-center items-center cursor-pointer">
                <p className="font-bold text-2xl">
                  <BiCloudUpload />
                </p>
                <p className="text-lg">Click to upload</p>
              </div>
            </div>
            <input
              type="file"
              className="w-0 h-0"
              accept=".jpeg, .jpg, .png, .gif"
              onChange={handleFileSelect}
            />
          </label>
        )}
        <button
          type="button"
          className="w-24 py-2 my-5 bg-red-500 rounded-md text-sm text-secColor font-semibold"
          onClick={() => {
            savePin();
          }}
        >
          Save Pin
        </button>
      </div>
    </div>
  );
};

const UserInput = ({ placeholder, setValue, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(ev) => setValue(ev.target.value)}
      value={value}
      className="w-full h-14 px-5 m-3 rounded-md bg-secondaryColor border border-white text-black shadow-xl"
    />
  );
};

export default NewPin;
