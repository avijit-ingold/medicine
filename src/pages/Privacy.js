import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout"
import { GenericApiContext } from "../context/GenericApiContext";
import styles from './page.module.css';

const Privacy = () => {
    const [blogData, setBlogData] = useState();

    const context = useContext(GenericApiContext);

    const getBlogData = () => {
        const url = 'policies/return';

        context.getGetData(url, 'return')
    }

    useEffect(() => {
        getBlogData()
    }, [])

    useEffect(() => {
        if (context.returnData) {
            setBlogData(context.returnData.data.data[0])
        }

    }, [context.returnData])


    return (
        <>
            <Layout>


                <div style={{ marginTop: '116px' }} className={styles.privacy_policy_container}>
                    <header className={styles.privacy_header}>
                        <h1>Privacy Policy</h1>
                        <p>
                            To learn more about Privacy at LinkedIn please visit our{" "}
                        </p>
                    </header>
                    <main className={styles.privacy_main}>
                        <section className={styles.privacy_content}>
                            {
                                blogData && (
                                    <p >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blogData.content.split('<p>'), // The HTML string you want to render
                                            }}
                                        />
                                    </p>

                                )
                            }
                        </section>
                        <aside className={styles.privacy_sidebar}>
                            <h3>Table of Contents:</h3>
                            <ul>
                                <li><a href="#introduction">Introduction</a></li>
                                <li><a href="#data-we-collect">Data We Collect</a></li>
                                <li><a href="#how-we-use-your-data">How We Use Your Data</a></li>
                                <li><a href="#how-we-share-information">How We Share Information</a></li>
                                <li><a href="#your-choices">Your Choices & Obligations</a></li>
                                <li><a href="#other-information">Other Important Information</a></li>
                            </ul>
                        </aside>
                    </main>
                </div>
            </Layout>
        </>
    )
}

export default Privacy;

