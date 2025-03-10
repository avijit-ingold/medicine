import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import OfferBanner from '../OfferBanner/OfferBanner';
import NewArrivalSection from '../NewArrivalSection/NewArrivalSection'
import medicineBlueImg from '../../assets/images/Medical/med-blue.svg';
import medicineWhiteImg from '../../assets/images/Medical/med-white.svg';
import pawWhite from '../../assets/images/Medical/paw-med-white.svg';
import pawBlue from '../../assets/images/Medical/paw-med-blue.svg';
import callBlue from '../../assets/images/Medical/call-medicine-blue.svg';
import callWhite from '../../assets/images/Medical/call-medicine-white.svg';
import cylinderBlue from '../../assets/images/Medical/oxygen-tank-blue.svg';
import cylinderWhite from '../../assets/images/Medical/oxygen-tank-white.svg';
import suppliment3 from '../../assets/images/Medical/2_supplement_bottles_1_open_cap_with_wood.jpg';
import suppliment1 from '../../assets/images/Medical/Box With Bottle Render.jpg';
import suppliment2 from '../../assets/images/Medical/Layer 1.jpg';
import TestamentBranding from '../TestamentBranding/TestamentBranding';
import FAQ from '../FAQ/FAQ';
import BlogSection from '../BlogSection/BlogSection'
import NewsletterSection from '../NewsletterSection/NewsletterSection'
import { GenericApiContext } from '../../context/GenericApiContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const HomePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovEffect, setHovEffect] = useState(false);
  const [bannerImage, setBannerImage] = useState([]);

  const context = useContext(GenericApiContext)

  const categories = [
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: medicineWhiteImg,
      imgBlue: medicineBlueImg
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: callWhite,
      imgBlue: callBlue
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: pawWhite,
      imgBlue: pawBlue
    },
    {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum dolor si amet entar pernosal diamlo",
      imgWhite: cylinderWhite,
      imgBlue: cylinderBlue
    }
  ]

  const handleCategoryClick = (index) => {
    setSelectedIndex(index);
  };

 

  useEffect(() => {
    const getBannerImage = () => {
      const url = 'sliders'
  
      context.getGetData(url,'homeBanner');
    }

    getBannerImage();
  }, [])

  useEffect(() => {
    if (context.getHomeData) {
      if(context.getHomeData.data.data[0].photo){
        setBannerImage(context.getHomeData.data.data[0].photo)
      }
    }
  }, [context.getHomeData])


  return (
    <>
      <div className={styles.homePage_banner_container} style={{marginTop:'86px'}}>
        {bannerImage && (<LazyLoadImage src={bannerImage} alt='home banner' className={styles.homePage_banner_container_image} loading='lazy' />)}

      </div>
      <div className={`${styles.homePage_container_main}`}>
        <div className={`${styles.homePage_categories_container_main} container`}>
          <div className={`${styles.homePage_categories_container}`}>
            {categories && categories.map((category, ind) => {
              return (
                <div key={ind} className={selectedIndex === ind ? `${styles.homepage_category_active}` : `${styles.homepage_category}`} onClick={() => handleCategoryClick(ind)} onMouseEnter={() => setHovEffect(true)} onMouseLeave={() => setHovEffect(false)}>
                  <span className={`${styles.category_icon_container}`}>
                    <img src={selectedIndex === ind ? category.imgWhite : category.imgBlue} className={`${styles.category_icon}`} />
                  </span>
                  <span className={`${styles.category_heading_container}`}>
                    {category.name}
                  </span>
                  <span className={`${styles.category_text_container}`}>
                    {category.description}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`${styles.homePage_offerBanner_container_main}`}>
          <div className={`${styles.homePage_singleOffer_container}`}>
            <div className={`${styles.homePage_singleOffer_textContainer_first}`}>
              <span className={styles.heading_main}>
                SPECIAL OFFER
              </span>
              <span className={styles.heading_subHeading}>
                ON SYRUP
              </span>
              <span className={styles.heading_Button}>
                SHOP NOW
              </span>
            </div>
            <div className={`${styles.homePage_singleOffer_image_container}`}>
              <img src={suppliment1} className={styles.homePage_singleOffer_image} />
            </div>
          </div>
          <div className={`${styles.homePage_singleOffer_container}`}>
            <div className={`${styles.homePage_singleOffer_textContainer_first}`}>
              <span className={styles.heading_main}>
                SPECIAL OFFER
              </span>
              <span className={styles.heading_subHeading}>
                ON SYRUP
              </span>
              <span className={styles.heading_Button}>
                SHOP NOW
              </span>
            </div>
            <div className={`${styles.homePage_singleOffer_image_container}`}>
              <img src={suppliment2} className={styles.homePage_singleOffer_image} />
            </div>
          </div>
          <div className={`${styles.homePage_singleOffer_container}`}>
            <div className={`${styles.homePage_singleOffer_textContainer_first}`}>
              <span className={styles.heading_main}>
                SPECIAL OFFER
              </span>
              <span className={styles.heading_subHeading}>
                ON SYRUP
              </span>
            </div>
            <div className={styles.homePage_singleOffer_button_container}>
              <span className={styles.heading_Button}>
                SHOP NOW
              </span>
            </div>
            <div className={`${styles.homePage_singleOffer_image_container}`}>
              <img src={suppliment3} className={styles.homePage_singleOffer_image} />
            </div>
          </div>
        </div>
        {/* <div className={styles.homePage_speciality_section_main}>
          <div className={styles.homePage_speciality_section_container}>
            {
              categories && categories.map((ele, ind) => {
                return (
                  <div className={styles.eachSpecial_container} key={ind}>
                    <div className={styles.eachSpecial_image_container}>
                      <img src={ele.imgWhite} alt='specialty-logo' className={styles.eachSpecial_image} />
                    </div>
                    <div className={styles.eachSpecial_text_container}>
                      <span className={styles.eachSpecial_mainText}>
                        {ele.name}
                      </span>
                      <span className={styles.eachSpecial_desc + ' d-none d-md-block d-lg-block d-xl-block'}>
                        {ele.name}
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div> */}
      </div>
      <ShopByCategories />
      <OfferBanner />
      <NewArrivalSection />
      <TestamentBranding />
      {/* <LimitedOfferSection /> */}
      <FAQ />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}


export default HomePage;
