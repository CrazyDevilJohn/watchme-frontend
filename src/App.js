import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Loding } from "./components";
import { Home } from "./container";
import { firebaseAuth } from "./firebaase/firebase";
import { SET_USER } from "./context/actions/userAction";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(SET_USER(user?.providerData[0]));
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 2000);
      } else {
        console.log("user not found");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 2000);
      }
    });
  }, []);

  return isLoading ? (
    <Loding />
  ) : (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
