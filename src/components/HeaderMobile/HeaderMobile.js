import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderMobile.module.css';
import { CaretDown, GeoAlt, Envelope, Search, Cart, Person, ChevronDown } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import logo from '../../assets/images/Medical/logo 1.png';
import { encryptData, decryptData } from "../../utils/CryptoUtils";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import RedirectModal from '../RedirectModal/RedirectModal';

const HeaderMobile = () => {

  const [menuActive, setMenuActive] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [custName, setCustName] = useState();
  const [categories, setCategories] = useState([]);
  const [categoryEncryptedArray, setCategoryEncryptedArray] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const location = useLocation();
  const context = useContext(GenericApiContext);
  const navigate = useNavigate();

  var loginDetails = []

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleAfterLogin = (param) => {
    setCustName(getInitials(param.firstname, param.lastname));
  }


  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const redirect = (id) => {
    navigate(`/category/${categoryEncryptedArray[id]}`);
  }

  const handleLogout = () => {
    const url = 'integration/customer/revoke-customer-token';
    context.getPostDataQuick(url, 'logout')
  }


  const getCustomerDetails = async () => {
    const url = 'customers/me'
    if (sessionStorage.getItem('CustomerToken')) {
      context.getCustomerData(url);
      getQuoteID();
    }
  }

  const getQuoteID = async () => {
    const headers = {
      "Content-Type": "application/json",
      "System-Key": "12345",
      "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
    };
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API_URL + 'carts/mine/',
      headers: headers
    }).then((res) => {
      sessionStorage.setItem('QuoteID', res.data)
    }).catch((err) => {
      if (err.response) {
        if (err.response.status === 400) {
          toast.error(`Bad Request: ${err.response.data.message || 'Invalid request'}`, {
            autoClose: 1100
          });
        } else {
          toast.error(`Error ${err.response.status}: ${err.response.data.message || 'Something went wrong'}`, {
            autoClose: 1100
          });
        }
      } else {
        toast.error(`Network Error: ${err.message}`, {
          autoClose: 1100
        });
      }
    }).finally(() => {
    });
  }

  const navigateCart = () => {
    if (context.ifLoggedin) {
      navigate('/myProfile/cart')
    } else {
      setShowModal(true)
    }
  }


  useEffect(() => {
    loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
    if (loginDetails) {
      handleAfterLogin(loginDetails);
    } else {
      getCustomerDetails()
    }
  }, [])


  useEffect(() => {
    if (context.customerData) {
      setCustomerDetails(context.customerData.data)
    }
  }, [context.customerData])


  useEffect(() => {
    if (customerDetails) {
      sessionStorage.setItem('loginDetails', JSON.stringify(customerDetails))
      handleAfterLogin(customerDetails);
    }
  }, [customerDetails])

  useEffect(() => {
    const categoriesImage = () => {
      const url = 'b2c/getCategory'

      context.getGetData(url, 'categories');
    }
    setTimeout(() => {
      categoriesImage();
    }, 1000)

  }, [])

  useEffect(() => {
    if (context.getCategoryData) {

      var tempArray = []
      if (context.getCategoryData.data) {
        setCategories(context.getCategoryData.data)
        if (context.getCategoryData.data.length > 0) {
          context.getCategoryData.data.map((ele) => {
            const encrypted = encryptData(ele.id);
            tempArray.push(encrypted);
          })
        }
      }
      setCategoryEncryptedArray(tempArray);
    }

  }, [context.getCategoryData])

  useEffect(() => {
    if (context.logout) {
      sessionStorage.removeItem('CustomerToken');
      sessionStorage.removeItem('QuoteID');
      sessionStorage.removeItem('loginDetails');
      navigate('/')
      window.location.reload()
      setMenuActive(false)
    }
  }, [context.logout])




  return (
    <>
      <header>
        <div className={styles.hamburger_menu_container}>
          <div className={styles.navbar_adress_details_container_main}>
            <div className={styles.navbar_adress_details_container}>
              <div className={styles.navbar_adress_text_container + ' col-xl-6'}>
                <span className={styles.navbar_socialMedia_icon}>
                  <GeoAlt size={12} />
                </span>
                <span className={styles.navbar_adress_text}>
                  Berlin State2435 B, 11005 Berlin State, Make Alow
                </span>
              </div>
              <div>
                <span className={styles.navbar_socialMedia_icon + ' col-xl-6'}>
                  <Envelope size={12} />
                </span>
                <span className={styles.navbar_adress_text}>
                  medicalTeam@medicalTeam.com
                </span>
              </div>
            </div>
          </div>
          <div className={styles.hamburger_menu}>
            <div className={styles.bar + ' ' + (menuActive ? styles.animate : "")} onClick={toggleMenu}></div>
            <div className={styles.navbar_headLogo_text_container} onClick={() => navigate('/')}>
              <img className={styles.navbar_headLogo} onClick={() => navigate('/')} src={logo} alt='logo' />
            </div>
            <div className={styles.navbar_pofile_search_section_container}>
              <div className={styles.navbar_search_bar}>
                <input type="search" placeholder="Search here" value={searchText} className={`${styles.navbar_searchbarinput_box} `} onChange={(e) => setSearchText(e.target.value)} />
                <Search className={styles.navbar_search_icon} />
              </div>
              <span className={styles.navbar_profile_icons} onClick={() => navigateCart()}>
                <Cart size={18} />
                <span className={styles.navbar_cart_amount}>{context?.cartCount}</span>
              </span>
              {
                sessionStorage.getItem('loginDetails') ? (
                  <span className={`${styles.navbar_profile_icons} ` + `${styles.navbar_profile_container}`} onClick={() => navigate('/myProfile')}>
                    <Person size={18} />
                  </span>
                ) : (
                  <span className={styles.navbar_profile_icons}>
                    <span className={styles.navbar_profile_name} onClick={() => navigate('/login')}>{context.ifLoggedin ? custName + ' ' : 'Login'}</span>
                  </span>
                )
              }


            </div>
          </div>
        </div>

        <nav className={styles.mobile_menu + " " + (menuActive ? styles.active : "")}>
          <ul className={styles.mobile_menu_list}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li className={styles.has_children} onClick={toggleSubmenu}>
              <span className={styles.li_about} >Categories <span className={styles.icon_arrow + " " + (submenuOpen ? styles.open : "")}><CaretDown /></span></span>
              <ul className={styles.children + " " + (submenuOpen ? styles.active : "")}>
                {categories && categories.map((ele, id) => {
                  return (
                    <li className='border-0' key={id} onClick={() => redirect(id)}>{ele.name}</li>
                  )
                })}
              </ul>
            </li>
            <li onClick={() => navigate('blogs')}>
              Blogs
            </li>
            <li onClick={() => navigate('aboutUs')}>
              About Us
            </li>
            {
              sessionStorage.getItem('loginDetails') && (
                <li>
                  <a onClick={() => handleLogout()}>Logout</a>
                </li>

              )
            }
          </ul>
        </nav >
        <div className={(menuActive ? styles.blurBackground : "d-none")} onClick={toggleMenu}></div>
      </header >
      <RedirectModal show={showModal} location={location} />
    </>
  )
};


export default HeaderMobile;
