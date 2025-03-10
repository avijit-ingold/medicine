import React, { useState, useEffect, useContext } from 'react';
import styles from './BlogComponent.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import { Facebook, TwitterX, Linkedin } from 'react-bootstrap-icons';

const BlogComponent = () => {
  const cards = [
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: "flower.jpg", // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: "selfie.jpg",
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: "flower.jpg", // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: "selfie.jpg",
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: "flower.jpg", // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: "selfie.jpg",
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: "flower.jpg", // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: "selfie.jpg",
    },
    // Add more card objects as needed
  ];
  const [blogList, setBlogList] = useState(null);
  const context = useContext(GenericApiContext)

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
    <div className={styles.card_grid}>
      {blogList && blogList.map((blog, index) => (
        <div className={styles.card} key={index}>
          <img src={blog.banner} alt={blog.title} className={styles.card_image} />
          <div className={styles.card_content}>
            <h3>{blog.title}</h3>
            <p>{blog.short_description}</p>
            <div className={styles.social_icons}>
              <a href="#"><Facebook /></a>
              <a href="#"><TwitterX /></a>
              <a href="#"><Linkedin /></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};


export default BlogComponent;
