import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './OfferBanner.module.css';
import OfferBannerImg from '../../assets/images/Medical/Layer 15.jpg'
import { GenericApiContext } from '../../context/GenericApiContext';

const OfferBanner = () => {
  const [saleArray, setSaleArray] = useState();

  const context = useContext(GenericApiContext)

  // useEffect(() => {
  //   const getOfferBannerDetails = () => {
  //     const url = 'business-settings'

  //     context.getGetData(url, 'headerMenu');
  //   }

  //   getOfferBannerDetails();
  // }, [])

  // useEffect(() => {
  //   if (context.getHeaderdata) {
  //     const title = {
  //       title: context.getHeaderdata.data.data.find(item => item.type === "endodfsale_title"),
  //       subTitle: context.getHeaderdata.data.data.find(item => item.type === "endodfsale_subtitle"),
  //       heading: context.getHeaderdata.data.data.find(item => item.type === "endodfsale_heading")
  //     }
  //     setSaleArray(title);
  //   }
  // }, [context.getHeaderdata])


  return (
    <>
      <div className={styles.OfferBanner_main_container + ' mt-5'}>
        <div className={styles.OfferBanner_image_overLay_container}>
          <div className={styles.OfferBanner_text_container}>
            
              
                <span className={styles.OfferBanner_heading_text}>
                  {/* {saleArray.heading.value} */} Week End SALE
                </span>
                <span className={styles.OfferBanner_sub_heading_Description + ' d-none d-lg-block d-xl-block d-md-block'}>
                  {/* {saleArray.title.value} */} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <span className={styles.OfferBanner_Description + ' d-none d-lg-block d-xl-block d-md-block'}>
                  {/* {saleArray.subTitle.value} */} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                </span>
                <span className={styles.OfferBanner_Button}>
                  SHOP NOW
                </span>
             
           

          </div>
        </div>
        <div className={styles.OfferBanner_image_container}>
          <img src={OfferBannerImg} className={styles.OfferBanner_image} alt='OfferBanner' />
        </div>
      </div>
    </>
  )
}


export default OfferBanner;
