import Layout from "./Layout"
import { Outlet, Link, useNavigate } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage';
import { useEffect, useContext } from "react";
import { GenericApiContext } from "../context/GenericApiContext";


const Home = () => {
    const context = useContext(GenericApiContext);
    const navigate = useNavigate()

    // useEffect(() => {
    //     context.checkIfLoggedIn();
    //     if (!context.ifLoggedin){
    //         navigate('/')
    //     }
    // }, [context.ifLoggedin])


    return (
        <>
            <div>
                <Layout>
                    <HomePage />
                </Layout>
            </div>
        </>
    )
}

export default Home;

