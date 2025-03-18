// Import necessary components and libraries
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from './pages/Auth'
import { GenericApiContext } from "./context/GenericApiContext";
import { useContext, useEffect, useState } from "react";
import Profile from "./pages/Profile";
import ProductDetailsPage from "./pages/ProductDetailPage";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUS";
import Blogs from "./pages/Blogs";
import PaymentSuccesful from "./pages/PaymentSuccesful";


const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/" element={
                    <Home />
                } />
                <Route path="/myProfile" element={
                    <Profile />
                } >
                    <Route path="/myProfile/:cart" element={
                        <Profile />
                    } />
                </Route>
                <Route path="/productDetails/:id" element={
                    <ProductDetailsPage />
                } />
                <Route path="/category/:id" element={
                    <Category />
                } />
                <Route path="/brand/:id" element={
                    <Category />
                } />
                <Route path="/checkout" element={
                    <Checkout />
                } />
                <Route path="/privacy" element={
                    <Privacy />
                } />
                <Route path="/blogs" element={
                    <Blogs />
                } />
                <Route path="/aboutUs" element={
                    <AboutUs />
                } />
                <Route path="/success/:orderId" element={
                    <PaymentSuccesful />
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
