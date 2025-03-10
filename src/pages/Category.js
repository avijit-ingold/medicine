import CategoryPageComponent from "../components/CategoryPageComponent/CategoryPageComponent";
import Layout from "./Layout"
import { encryptData, decryptData } from "../utils/CryptoUtils";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenericApiContext } from "../context/GenericApiContext";

const Category = () => {

    const { id } = useParams();

    const context = useContext(GenericApiContext)

    const [decryptedData, setDecryptedData] = useState("");
    const [parent, setParent] = useState(null);

    useEffect(() => {
        const handleDecrypt = () => {
            const decrypted = decryptData(id);
            setDecryptedData(decrypted);
        };

        return handleDecrypt;
    }, [context.getProductDetails])


    useEffect(() => {
        const decrypted = decryptData(id);
        setDecryptedData(decrypted);
    }, [id])


    useEffect(() => {
        const getCategoryFromUrl = () => {
            const url = window.location.pathname; 
            const parts = url.split('/');
            return parts[1]; 
        };

        const fetchedCategory = getCategoryFromUrl();
        setParent(fetchedCategory); 
    }, [window.location.pathname]);


    return (
        <>
            <Layout>
                {parent && (
                    <CategoryPageComponent id={decryptedData} loading={context.loading} parent={parent}/>
                )}
            </Layout>
        </>
    )
}

export default Category;

