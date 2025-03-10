import React, { useContext, useState, useEffect } from 'react';
import styles from './TestamentBranding.module.css';
import UpperImage from '../../assets/images/Medical/Layer 16.jpg';
import LowerImage from '../../assets/images/Medical/Layer 17.jpg';
import { GenericApiContext } from '../../context/GenericApiContext';


const TestamentBranding = () => {

  const [brandData, setBrandData] = useState(null);
  const [aboutUsArray, setAboutUsArray] = useState();

  const context = useContext(GenericApiContext);

  useEffect(() => {
    const getBrandNames = () => {
      const url = 'brands'

      context.getGetData(url, 'brandData');
    }

    getBrandNames();
  }, [])

  useEffect(() => {
    if (context.getBrandData) {

      setBrandData(context.getBrandData.data.data);
    }
  }, [context.getBrandData])


  useEffect(() => {
    const getAboutUsDetails = () => {
      const url = 'business-settings'

      context.getGetData(url, 'headerMenu');
    }

    getAboutUsDetails();
  }, [])

  useEffect(() => {
    if (context.getHeaderdata) {
      const title = {
        aboutUS: context.getHeaderdata.data.data.find(item => item.type === "about_title"),
        ourServices: context.getHeaderdata.data.data.find(item => item.type === "service_subtitle")
      }
      setAboutUsArray(title);
    }
  }, [context.getHeaderdata])


  return (
    <>
      <div className={styles.testament_branding_container_main + ' container'}>
        <div className={styles.testament_container}>
          {aboutUsArray && (
            <>
              <div className={styles.testament_container_upper + ' row'}>
                <div className={styles.testament_text_container + ' col-6'}>
                  <span className={styles.testament_text_heading}>ABOUT US</span>
                  <span className={styles.testament_text_description}>{aboutUsArray.aboutUS.value}</span>
                  <span className={styles.testament_Button} >
                    SHOP NOW
                  </span>
                </div>
                <br />
                <div className={styles.testament_img_container + ' col-6'}>
                  <img src={UpperImage} alt='testament1' className={styles.testament_img} />
                </div>
              </div>
              <div className={styles.testament_container_lower + ' row'}>
                <div className={styles.testament_img_container + ' col-6'}>
                  <img src={LowerImage} alt='testament2' className={styles.testament_img} />
                </div>
                <div className={styles.testament_text_container + ' col-6'}>
                  <span className={styles.testament_text_heading}>OUR SERVICES</span>
                  <span className={styles.testament_text_description}>{aboutUsArray.ourServices.value}</span>
                  <br />
                  <span className={styles.testament_Button} >
                    SHOP NOW
                  </span>
                </div>
              </div>
            </>
          )

          }

        </div>

      </div>
      <div className={styles.branding_container_main}>
        <div className={styles.branding_container + ' container'}>
          {
            brandData && brandData.map((brands, ind) => {
              return (
                <div key={ind} className={styles.branding_image_container + ' ' + (ind !== (brandData.length - 1) ? styles.branding_container_right_border : '')}>
                  <img src={brands.logo} alt='brandImage' className={styles.branding_image} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
};


export default TestamentBranding;
