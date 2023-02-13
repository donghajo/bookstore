import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";

import useCookies from "react-cookie/cjs/useCookies";
import { actionTypes, useStateValue } from "./store";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import BookDetail from "./pages/BookDetail";
import AdminPage from "./pages/admin/AdminPage";
import Mypage from "./pages/Mypage";
import OrderPage from "./pages/OrderPage";

const App = () => {
  const [{ token }, dispatch] = useStateValue();
  const [cookies] = useCookies(["accessToken"]);
  useEffect(() => {
    if (token === null) {
      const { accessToken } = cookies;
      if (accessToken) {
        dispatch({ type: actionTypes.SET_TOKEN, value: accessToken });
      }
    }
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      console.log("UserInfo")
      dispatch({ type: actionTypes.LOAD_MY_INFO_REQUEST, value: JSON.parse(userInfo) });
    }
  }, [dispatch, token, cookies]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
