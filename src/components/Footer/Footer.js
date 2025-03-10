import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';
import { Facebook, Twitter, Youtube, Messenger, Instagram, TelephoneFill, Calendar3Week, SendFill, Envelope, Globe } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container + ' container'}>
        <div className={styles.footer_brand}>
          <h1>HealthLife</h1>
          <p>Cras eu pulvinar felis, vitae aliquet metus. Aptent taciti sociosqu torquentper.</p>
          <div className={styles.footer_contact}>
            <p className='mr-2'><TelephoneFill />  000 - 123 - 456789</p>
            <p><Envelope /> info@example.com</p>
            <p><Globe /> www.example.com</p>
          </div>
          <div className={styles.footer_socials}>
            <a href="#"><Facebook /></a>
            <a href="#"><Youtube /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Messenger /></a>
          </div>
        </div>
        <div className={styles.footer_links}>
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Plans</a></li>
              <li><a href="#">Products</a></li>
              <li><a onClick={() => navigate('/privacy')}>Privacy Policy</a></li>
              <li><a href="#">Terms Of Use</a></li>
            </ul>
          </div>
          <div>
            <h3>Help & Support</h3>
            <ul>
              <li><a href="#">Support</a></li>
              <li><a href="#">Locate Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>Services Cities</h3>
            <ul>
              <li><a href="#">New York</a></li>
              <li><a href="#">Los Angeles</a></li>
              <li><a href="#">Chicago</a></li>
              <li><a href="#">Houston</a></li>
              <li><a href="#">Washington</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footer_newsletter}>
          <h3>Newsletter</h3>
          <p>Subscribe to our Newsletter to get the latest news and insights</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit"><SendFill size={19} /></button>
          </form>
          <p>By subscribing, you accept the Privacy Policy.</p>
          <div className={styles.footer_availability_conatiner}>
            <Calendar3Week size={40} />
            <div>
              <p className={styles.footer_availibility_days}>Monday-Saturday</p>
              <p> 9.00 Am - 9.00 Pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p>All rights reserved. Copyright @2024.</p>

      </div>
    </footer>
  )
};

export default Footer;
