import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './TestamentBranding.module.css';
import UpperImage from '../../assets/images/Medical/Layer 16.jpg';
import LowerImage from '../../assets/images/Medical/Layer 17.jpg';
import { GenericApiContext } from '../../context/GenericApiContext';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


const TestamentBranding = () => {

  const [brandData, setBrandData] = useState(null);
  const [aboutUsArray, setAboutUsArray] = useState();

  const context = useContext(GenericApiContext);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftTopRef = useRef(null);
  const rightTopRef = useRef(null)


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

  useGSAP(() => {
    if (!leftRef.current || !rightRef.current || !leftTopRef.current || !rightTopRef.current) {
      return;
    }

    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    gsap.set([leftRef.current, rightRef.current, leftTopRef.current, rightTopRef.current], {
      x: 0,
      opacity: 1
    });

    const animations = [
      gsap.fromTo(leftRef.current,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(rightRef.current,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(leftTopRef.current,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: leftTopRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),

      gsap.fromTo(rightTopRef.current,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: rightTopRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse"
          },
          ease: "power1.inOut",
        }
      ),
    ];

    return () => {
      animations.forEach(animation => animation.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [aboutUsArray]);


  return (
    <>
      <div className={styles.testament_branding_container_main + ' container'}>
        <div className={styles.testament_container}>
          {aboutUsArray && (
            <>
              <div className={styles.testament_container_upper + ' row'}>
                <div className={styles.testament_text_container + ' col-6'} ref={leftTopRef}>
                  <span className={styles.testament_text_heading}>ABOUT US</span>
                  <span className={styles.testament_text_description}>{aboutUsArray.aboutUS.value}</span>
                  <span className={styles.testament_Button} >
                    SHOP NOW
                  </span>
                </div>
                <br />
                <div className={styles.testament_img_container + ' col-6'} ref={rightTopRef} >
                  <img src={UpperImage} alt='testament1' className={styles.testament_img} />
                </div>
              </div>
              <div className={styles.testament_container_lower + ' row'}>
                <div className={styles.testament_img_container + ' col-6'} ref={leftRef}>
                  <img src={LowerImage} alt='testament2' className={styles.testament_img} />
                </div>
                <div className={styles.testament_text_container + ' col-6'} ref={rightRef} >
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
