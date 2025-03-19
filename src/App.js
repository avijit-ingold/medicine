import { BrowserRouter, Routes, Route, useNavigate, navigate } from "react-router-dom";
import AppRoutes from "./Routes";
import GenericApiProvider from "./context/GenericApiProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";


export default function App() {
  return (
    <>
      <GenericApiProvider>
        <AppRoutes />
      </GenericApiProvider>
    </>
  );
}
