import React from 'react';
import PropTypes from 'prop-types';
import styles from './LimitedOfferSection.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from '../Product/Product';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Layer1 from '../../assets/images/Medical/Layer 19.png';
import Layer2 from '../../assets/images/Medical/Layer 21.png';
import Layer3 from '../../assets/images/Medical/Layer 22.png';
import Layer4 from '../../assets/images/Medical/Layer 24.png';
import Layer5 from '../../assets/images/Medical/Layer 32.jpg';
import Layer6 from '../../assets/images/Medical/Layer 33.png';
import Layer7 from '../../assets/images/Medical/Layer 34.png';
import Layer8 from '../../assets/images/Medical/Layer 35.png';
import Layer9 from '../../assets/images/Medical/Layer 36.png';
import Layer10 from '../../assets/images/Medical/Layer 37.png';
import Layer11 from '../../assets/images/Medical/Layer 38.png';
import Layer12 from '../../assets/images/Medical/Layer 39.png';


const LimitedOfferSection = () => {

  const medicinesArray = [
    {
      "name": "Paracetamol 500mg",
      "original_price": 50.0,
      "review": 0,
      "offer_percentage": 0,
      "offer_price": 50.0,
      "manufacturer": "HealthCorp",
      "expiry_date": "2025-12-31",
      "in_stock": true,
      "img": Layer1,
      "noReview": 0
    },
    {
      "name": "Ibuprofen 200mg",
      "original_price": 60.0,
      "review": 4.7,
      "offer_percentage": 15,
      "offer_price": 51.0,
      "manufacturer": "MediPlus",
      "expiry_date": "2024-08-15",
      "in_stock": true,
      "img": Layer2,
      "noReview": 144
    },
    {
      "name": "Amoxicillin 250mg",
      "original_price": 100.0,
      "review": 4.8,
      "offer_percentage": 20,
      "offer_price": 80.0,
      "manufacturer": "PharmaCare",
      "expiry_date": "2026-05-20",
      "in_stock": true,
      "img": Layer3,
      "noReview": 1444
    },
    {
      "name": "Cetirizine 10mg",
      "original_price": 30.0,
      "review": 4.2,
      "offer_percentage": 0,
      "offer_price": 30.0,
      "manufacturer": "WellnessMeds",
      "expiry_date": "2025-03-10",
      "in_stock": true,
      "img": Layer4,
      "noReview": 1111
    },
    {
      "name": "Metformin 500mg",
      "original_price": 120.0,
      "review": 4.9,
      "offer_percentage": 25,
      "offer_price": 90.0,
      "manufacturer": "DiabCare",
      "expiry_date": "2027-09-25",
      "in_stock": true,
      "img": Layer5,
      "noReview": 11254849
    },
    {
      "name": "Ibuprofen 200mg",
      "original_price": 60.0,
      "review": 4.7,
      "offer_percentage": 15,
      "offer_price": 51.0,
      "manufacturer": "MediPlus",
      "expiry_date": "2024-08-15",
      "in_stock": true,
      "img": Layer6,
      "noReview": 125452
    },
    {
      "name": "Amoxicillin 250mg",
      "original_price": 100.0,
      "review": 4.8,
      "offer_percentage": 0,
      "offer_price": 100.0,
      "manufacturer": "PharmaCare",
      "expiry_date": "2026-05-20",
      "in_stock": false,
      "img": Layer7,
      "noReview": 11452
    },
    {
      "name": "Cetirizine 10mg",
      "original_price": 30.0,
      "review": 4.2,
      "offer_percentage": 5,
      "offer_price": 28.5,
      "manufacturer": "WellnessMeds",
      "expiry_date": "2025-03-10",
      "in_stock": true,
      "img": Layer8,
      "noReview": 152
    }, {
      "name": "Ibuprofen 200mg",
      "original_price": 60.0,
      "review": 4.7,
      "offer_percentage": 15,
      "offer_price": 51.0,
      "manufacturer": "MediPlus",
      "expiry_date": "2024-08-15",
      "in_stock": true,
      "img": Layer9,
      "noReview": 12
    },
    {
      "name": "Amoxicillin 250mg",
      "original_price": 100.0,
      "review": 4.8,
      "offer_percentage": 20,
      "offer_price": 80.0,
      "manufacturer": "PharmaCare",
      "expiry_date": "2026-05-20",
      "in_stock": true,
      "img": Layer10,
      "noReview": 152
    },
    {
      "name": "Cetirizine 10mg",
      "original_price": 30.0,
      "review": 4.2,
      "offer_percentage": 5,
      "offer_price": 28.5,
      "manufacturer": "WellnessMeds",
      "expiry_date": "2025-03-10",
      "in_stock": true,
      "img": Layer11,
      "noReview": 166952
    },
    {
      "name": "Amoxicillin 250mg",
      "original_price": 100.0,
      "review": 4.8,
      "offer_percentage": 20,
      "offer_price": 80.0,
      "manufacturer": "PharmaCare",
      "expiry_date": "2026-05-20",
      "in_stock": false,
      "img": Layer12,
      "noReview": 1752
    }
  ]

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <ArrowRightCircle color='#b4b1b1' onClick={onClick} style={{ ...style }} className={styles.slick_Arrow_right} size={25} />
      </>
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <>
        <ArrowLeftCircle color='#b4b1b1' onClick={onClick} style={{ ...style }} className={styles.slick_Arrow_left} size={25} />
      </>
    );
  }

  var settings = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          nextArrow: false,
          prevArrow: false
        }
      }
    ]
  }

  return (
    <>
      <div className={styles.limitedOffer_container + ' ' + 'container'}>
        <div className={styles.limitedOffer_heading_container}>
          <span className={styles.limitedOffer_heading_text}>
            LIMITED PERIOD OFFER
          </span>
          <span className={styles.limited_offer_subheading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>
        <Slider {...settings} className='container'>
          {medicinesArray.map((slide, index) => {
            return (
              <div key={index}>
                <Product productObject={slide} parent="newArrival" />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  )
};

export default LimitedOfferSection;
