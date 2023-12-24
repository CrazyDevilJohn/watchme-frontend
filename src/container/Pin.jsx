import React from "react";
import { Route, Routes } from "react-router-dom";
import { Category, Feeds, Header, PinDetails, Search } from "../components";

const Pin = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/feed-details/:pinId" element={<PinDetails />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </div>
  );
};

export default Pin;
