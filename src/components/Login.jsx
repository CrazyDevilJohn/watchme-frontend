import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import WatchVideo from "../assets/watchme.mp4";
import logo from "../assets/watchme_white.png";
import { firebaseAuth } from "../firebaase/firebase";
import { createUser } from "../sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userAction";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        if (result.user.uid) {
          createUser(result.user.providerData[0]);
          dispatch(SET_USER(result.user.providerData[0]));
          console.log("naavigting");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* login Video */}
        <video
          src={WatchVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
      </div>
      {/* overlay effect */}
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
        {/* login content */}
        {/* logo */}
        <div className="p-5">
          <img src={logo} alt="logo" width="180px" />
        </div>

        {/* login button */}
        <div className="shadow-2xl">
          <div
            type="button"
            className="bg-mainColor flex justify-center
                          items-center p-2 rounded-lg cursor-pointer outline-none
                              "
            onClick={loginWithGoogle}
          >
            <FcGoogle className="mr-4" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
