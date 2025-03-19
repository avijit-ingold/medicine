// import Layout from "./Layout"
import { Outlet, Link } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage';
import LoginSignup from "../components/LoginSignup/LoginSignup";
import Layout from "./Layout";


const Auth = () => {
    return (
        <>
            <Layout>
                <LoginSignup />
            </Layout>
        </>
    )
}

export default Auth;

