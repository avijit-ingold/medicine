import { BrowserRouter, Routes, Route, useNavigate, navigate } from "react-router-dom";
import AppRoutes from "./Routes";
import GenericApiProvider from "./context/GenericApiProvider";
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';";
    document.head.appendChild(meta);
  }, []);
  return (
    <>
      <GenericApiProvider>
        <AppRoutes />
      </GenericApiProvider>
    </>
  );
}
