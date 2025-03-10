// import Layout from "./Layout"
import { Outlet, Link } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage';
import LoginSignup from "../components/LoginSignup/LoginSignup";


const Auth = () => {
    return (
        <>
        <LoginSignup/>
        </>
    )
}

export default Auth;

