import Layout from "./Layout"
import { Outlet, Link } from "react-router-dom";
import ProductDetailsComponent from "../components/ProductDetailsComponent/ProductDetailsComponent";
import { useContext, useEffect, useState } from "react";
import { GenericApiContext } from "../context/GenericApiContext";
import { useParams } from "react-router-dom";
import { encryptData, decryptData } from "../utils/CryptoUtils";
import RelatedProductComponent from "../components/RelatedProductComponent/RelatedProductComponent";
import AddReviewComponent from "../components/AddReviewComponent/AddReviewComponent";

const ProductDetailsPage = () => {
    const { id } = useParams();

    const context = useContext(GenericApiContext)

    const [decryptedData, setDecryptedData] = useState("");

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

    return (
        <>
            <Layout>
                {
                    decryptedData && (
                        <>
                            <ProductDetailsComponent loading={context.loading} id={decryptedData} />
                            {/* <AddReviewComponent id={decryptedData}/>
                            <RelatedProductComponent id={decryptedData} /> */}
                        </>
                    )
                }
            </Layout>
        </>
    )
}

export default ProductDetailsPage;

