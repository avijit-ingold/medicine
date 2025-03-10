import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSection.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import Product from '../Product/Product';
import Layer1 from '../../assets/images/Medical/Layer 16.jpg';
import Layer2 from '../../assets/images/Medical/Layer 17.jpg';
import Layer3 from '../../assets/images/Medical/Layer 29.png';
import Layer4 from '../../assets/images/Medical/Layer 30.png';
import Layer5 from '../../assets/images/Medical/Layer 31.png';
import Layer6 from '../../assets/images/Medical/Layer 45.png';
import { GenericApiContext } from '../../context/GenericApiContext';

const BlogSection = () => {

  const [blogList, setBlogList] = useState(null);

  const blogsArray = [
    {
      "blog_name": "Understanding JSON Basics",
      "number_of_comments": 15,
      "blog_date": "November 05,2024",
      "img": Layer1
    },
    {
      "blog_name": "Top 10 Programming Languages in 2024",
      "number_of_comments": 23,
      "blog_date": "November 05,2024",
      "img": Layer2
    },
    {
      "blog_name": "How to Build a Responsive Website",
      "number_of_comments": 8,
      "blog_date": "November 05,2024",
      "img": Layer3
    },
    {
      "blog_name": "Introduction to AI and Machine Learning",
      "number_of_comments": 30,
      "blog_date": "November 05,2024",
      "img": Layer4
    },
    {
      "blog_name": "The Future of Cloud Computing",
      "number_of_comments": 12,
      "blog_date": "November 05,2024",
      "img": Layer5
    },
    {
      "blog_name": "Top 10 Programming Languages in 2024",
      "number_of_comments": 23,
      "blog_date": "November 05,2024",
      "img": Layer6
    },
    {
      "blog_name": "How to Build a Responsive Website",
      "number_of_comments": 8,
      "blog_date": "November 05,2024",
      "img": Layer1
    },
    {
      "blog_name": "Introduction to AI and Machine Learning",
      "number_of_comments": 30,
      "blog_date": "November 05,2024",
      "img": Layer2
    },
    {
      "blog_name": "The Future of Cloud Computing",
      "number_of_comments": 12,
      "blog_date": "November 05,2024",
      "img": Layer3
    }
  ]

  const context = useContext(GenericApiContext)

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
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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



  useEffect(() => {
    const getBlogData = () => {
      const url = 'bloglist'

      context.getGetData(url, 'bloglist');
    }

    getBlogData();
  }, [])

  useEffect(() => {
    if (context.getBlogList) {
      setBlogList(context.getBlogList.data.data);
    }
  }, [context.getBlogList])


  return (
    <>
      <div className={styles.blogSection_container + ' ' + 'container'}>
        <div className={styles.blogSection_heading_container}>
          <span className={styles.blogSection_heading_text}>
            Lorem Ipsum
          </span>
          <span className={styles.blogSection_subheading}>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet
          </span>
        </div>
        <Slider {...settings} className='container'>
          {blogList && blogList.map((blog, index) => {
            return (
              <div key={index}>
                <Product productObject={blog} parent="blog" />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  )
};


export default BlogSection;
