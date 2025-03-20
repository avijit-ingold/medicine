import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout"
import { GenericApiContext } from "../context/GenericApiContext";
import Layer1 from '../assets/images/Medical/Layer 16.jpg';
import Layer2 from '../assets/images/Medical/Layer 17.jpg';
import Layer3 from '../assets/images/Medical/Layer 29.png';
import styles from './page.module.css'

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState()

    const context = useContext(GenericApiContext)

    const handleAboutUs = () => {
        const url = 'cmsPage/6'

        context.getGetData(url, 'aboutus');
    }

    useEffect(() => {
        handleAboutUs()
    }, [])

    useEffect(() => {
        if (context.aboutUsContent) {
            console.log(context.aboutUsContent.data)
            const formattedContent = context.aboutUsContent.data.content.replace(
                /{{media url=([^}]+)}}/g,
                "https://your-magento-backend.com/pub/media/$1"
            );
            setAboutUs(formattedContent);
        }
    }, [context.aboutUsContent])
    return (
        <>
            <Layout>
                {
                    aboutUs && (
                        <div style={{ marginTop: '110px' }}>
                            {/* <div dangerouslySetInnerHTML={{__html:aboutUs}}>

                            </div> */}
                            <div className={styles.mainContainer + ' container'}>
                                <div className="row mb-4">
                                    <div className="col-lg-6 col-md-12 image left-side">
                                        <div className="about_img">
                                            <img src={Layer1} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 right-side align-items-center d-flex">
                                        <div className="about_content">
                                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-lg-6 col-md-12 image right-side">
                                        <div className="about_img">
                                            <img src={Layer2} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 left-side align-items-center d-flex">
                                        <div className="about_content">
                                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-lg-6 col-md-12 image left-side">
                                        <div className="about_img">
                                            <img src={Layer3} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 right-side align-items-center d-flex">
                                        <div className="about_content">
                                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Layout >
        </>
    )
}

export default AboutUs;

