import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom";
import HeaderMobile from "../components/HeaderMobile/HeaderMobile";
import { GenericApiContext } from "../context/GenericApiContext";

export default function Layout({ children }) {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const context = useContext(GenericApiContext)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

    }, [screenWidth]);

    return (
        <div style={{ overflowX: "hidden" }}>
            {screenWidth && screenWidth < 769 ?
                (
                    <>
                        <HeaderMobile />
                        <main>{children}</main>
                        <Footer />
                    </>
                ) : (
                    <>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </>

                )
            }

        </div >
    )
}