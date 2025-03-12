import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './FAQ.module.css';
import Truck from '../../assets/images/Medical/truck.svg';
import Tracking from '../../assets/images/Medical/tracking.svg';
import Headphone from '../../assets/images/Medical/headphone.svg';
import Calender from '../../assets/images/Medical/calender.svg';
import Layer1 from '../../assets/images/Medical/Layer 28.png';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';


const DATA = [
  {
    id: 1,
    title: 'Lorem ipsum dolor commodo viverra.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    faq_dropDown_answer_show: 'faq_dropDown_answer_show 1'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor commodo viverra?',
    description: 'description 2',
    faq_dropDown_answer_show: 'faq_dropDown_answer_show 2'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor commodo viverra?',
    description: 'description 3',
    faq_dropDown_answer_show: 'faq_dropDown_answer_show 3'
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor commodo viverra?',
    description: 'description 4',
    faq_dropDown_answer_show: 'faq_dropDown_answer_show 4'
  }
]

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [faqData, setFaqData] = useState(DATA)

  const context = useContext(GenericApiContext);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // const prosTable = [
  //   {
  //     name: "Free Shipping",
  //     desc: "Free Shipping World Wide",
  //     img: Truck
  //   },
  //   {
  //     name: "Easy to Track Orders",
  //     desc: "Easy to Track Orders",
  //     img: Tracking
  //   },
  //   {
  //     name: "24hrs Customer Support",
  //     desc: "24hrs Customer Support",
  //     img: Headphone
  //   },
  //   {
  //     name: "On Time Delivery",
  //     desc: "On Time Delivery",
  //     img: Calender
  //   }
  // ]

  const faqTable = [
    {
      ques: "The Lorem ipsum text is derived from which sections?",
      ans: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment,we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the "
    },
    {
      ques: "The Lorem ipsum text is derived from which sections?",
      ans: "On the other hand, cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
    },
    {
      ques: "The Lorem ipsum text is derived from which sections?",
      ans: "On and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain."
    },
    {
      ques: "The Lorem ipsum text is derived from which sections?",
      ans: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire,"
    }
  ]

  // useEffect(() => {
  //   const getFAQdata = () => {
  //     const url = 'faqlist'

  //     context.getGetData(url, 'faqlist');
  //   }

  //   getFAQdata();
  // }, [])

  // useEffect(() => {
  //   if (context.getFaqList) {
  //     setFaqData(context.getFaqList.data.data);
  //   }
  // }, [context.getFaqList])

  return (
    <div className={styles.faq_container_main + ' container'}>
      <div className={styles.pros_container_main}>
        {/* {
          prosTable && prosTable.map((prosEle) => {
            return (
              <>
                <div className={styles.singlePros_container}>
                  <div className={styles.singlePros_img_container}>
                    <img src={prosEle.img} className={styles.singlePros_img } alt="pros_icon" />
                  </div>
                  <div className={styles.text_container}>
                    <span className={styles.singlePros_text_heading}>{prosEle.name}</span>
                    <span className={styles.singlePros_text_subHeading + ' d-none d-xl-block'}>{prosEle.desc}</span>
                  </div>
                </div>
              </>
            )
          })
        } */}
      </div>
      <div className={styles.faq_container + ' row'}>
        <div className={styles.faq_image_container + ' col-lg-6 col-xl-6 col-md-12 col-sm-12'}>
          <img className={styles.faq_image + ' d-md-bock d-lg-block d-xl-block'} src={Layer1} alt='FAQ-Image' />
        </div>
        <div className={styles.faq_dropDown_container + ' col-lg-6 col6 col-xl-6 col-sm-12'}>
          <div className={styles.faq_container_dropDown}>
            {faqData && faqData.map((faq, index) => (
              <div key={index} className={styles.faq_dropDown_question_container}>
                <div
                  onClick={() => toggleFAQ(index)}
                  className={styles.faq_dropDown_question}
                >
                  {faq.title}
                  {expandedIndex === index ? <CheckCircleFill color='#2dabf7' /> : <CheckCircleFill />}

                </div>
                <div
                  className={styles.faq_dropDown_answer + ' ' + (expandedIndex === index ? styles.faq_dropDown_answer_show : styles.faq_dropDown_answer_hide)}
                >
                  <p style={{ margin: 0 }}>{faq.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};


export default FAQ;
