import React from 'react';
import styles from './BlogComponent.module.css';
import { Facebook, TwitterX, Linkedin } from 'react-bootstrap-icons';
import Layer1 from '../../assets/images/Medical/Layer 16.jpg';
import Layer2 from '../../assets/images/Medical/Layer 17.jpg';
import Layer3 from '../../assets/images/Medical/Layer 29.png';
import Layer4 from '../../assets/images/Medical/Layer 30.png';
import Layer5 from '../../assets/images/Medical/Layer 31.png';
import Layer6 from '../../assets/images/Medical/Layer 45.png';

const BlogComponent = () => {
  const cards = [
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: Layer1, // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: Layer2,
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: Layer3 // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: Layer4,
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: Layer5, // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: Layer6,
    },
    {
      title: "White petaled flower",
      content:
        "A ligula faucibus eros sed bibendum imperdiet. Curabitur eget massa justo...",
      category: "Nature",
      tags: ["Flower", "White petaled"],
      author: "Admin",
      image: Layer1, // Add an image path here
    },
    {
      title: "Most Popular And Pleasant Ways To Take A Selfie",
      content:
        "Here are the most popular and pleasant ways to take a selfie and grab attention...",
      category: "Fashion",
      tags: ["Popular", "Selfie"],
      author: "Marry Robson",
      image: Layer2,
    },
    // Add more card objects as needed
  ];

  return (
    <div className={styles.card_grid}>
      {cards && cards.map((blog, index) => (
        <div className={styles.card} key={index}>
          <img src={blog.image} alt={blog.title} className={styles.card_image} />
          <div className={styles.card_content}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
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
