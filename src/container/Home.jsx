import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import {  NewPin } from "../components";
import { Pin } from "../container";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-mainColor">

      <Routes>
        <Route path="/*" element={<Pin />} />
        <Route path="/new-pin/" element={<NewPin />} />
      </Routes>
    </div>
  );
};

export default Home;
