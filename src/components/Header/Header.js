import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './Header.module.css';
import { Facebook, Instagram, TwitterX, Youtube, GeoAlt, Envelope, Search, Cart, Person, ChevronDown } from 'react-bootstrap-icons';
import logo from '../../../src/assets/images/Medical/logo.jpg'
import { GenericApiContext } from '../../context/GenericApiContext';
import { useNavigate } from 'react-router-dom';
import { encryptData, decryptData } from "../../utils/CryptoUtils";

export const useClickOutside = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const Header = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState('')
  const [custName, setCustName] = useState();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [headerData, setHeaderData] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brandData, setBrandData] = useState(null);
  const [showBrands, setShowBrands] = useState(false);
  const [categoryEncryptedArray, setCategoryEncryptedArray] = useState([]);
  const [brandEncryptedArray, setBrandEncryptedArray] = useState([]);
  const [userCartCount, setUserCartCount] = useState(0);
  const [profileImage, setProfileImage] = useState(null);


  const context = useContext(GenericApiContext);

  const navigate = useNavigate();

  const ref = useClickOutside(() => {
    setShowCategories(false)
    setShowBrands(false)
  });

  const handleMenuClick = (index, route) => {
    setSelectedIndex(index);
    if (route === 'Home') {
      navigate('/' + route)
    }
    else if (route === 'All Categories') {
      setShowCategories(!showCategories)
      setShowBrands(false)
    }
    else if (route === 'All Brands') {
      setShowBrands(!showBrands)
      setShowCategories(false)
    }
    else if (route === 'Blogs') {
      navigate('/blogs')
    }
    else if (route === 'Flash Sale') {
      navigate('/flashSales')
    }
    else {
      setShowCategories(false)
      setShowBrands(false)
    }
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleAfterLogin = (param) => {
    setCustName(getInitials(param.firstname, param.lastname));
    // setProfileImage(param.user.avatar_original);
  }

  const getCustomerDetails = async () => {
    const url = 'customers/me'

    context.getCustomerData(url);
  }

  const handleProfile = () => {
    navigate('/myProfile')
  }

  const redirect = (id) => {
    navigate(`/category/${categoryEncryptedArray[id - 1]}`);
    setShowCategories(false)
  }

  const redirectBrand = (id) => {
    navigate(`/brand/${brandEncryptedArray[id - 1]}`);
    setShowBrands(false)
  }

  const navigateCart = () => {
    if (context.ifLoggedin) {
      navigate('/myProfile/cart')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    setUserCartCount(context.cartCount)
  }, [context.cartCount])

  useEffect(() => {
    if (context.getHeaderdata) {
      setHeaderData(context.getHeaderdata.data.data.find(item => item.type === "header_menu_labels"));
    }
  }, [context.getHeaderdata])

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
    if (context.getCategoryData) {
      var tempArray = []
      if (context.getCategoryData.data.data) {
        setCategories(context.getCategoryData.data.data)
        if (context.getCategoryData.data.data.length > 0) {
          context.getCategoryData.data.data.map((ele) => {
            const encrypted = encryptData(ele.id);
            tempArray.push(encrypted);
          })
        }
      }
      setCategoryEncryptedArray(tempArray);
    }

  }, [context.getCategoryData])

  useEffect(() => {
    if (context.getBrandData) {
      var tempArray = []
      if (context.getBrandData.data.data) {
        setBrandData(context.getBrandData.data.data);
        if (context.getBrandData.data.data.length > 0) {
          context.getBrandData.data.data.map((ele) => {
            const encrypted = encryptData(ele.id);
            tempArray.push(encrypted);
          })
        }
      }
      setBrandEncryptedArray(tempArray);
    }
  }, [context.getBrandData])

  useEffect(() => {
    const getBannerImage = () => {
      const url = 'business-settings'
      context.getGetData(url, 'headerMenu');
    }

    const getBrandNames = () => {
      const url = 'brands'
      context.getGetData(url, 'brandData');
    }

    const categoriesImage = () => {
      const url = 'categories/top'

      context.getGetData(url, 'categories');
    }

    categoriesImage();
    getBrandNames();
    getBannerImage();
  }, [])

  useEffect(() => {
    getCustomerDetails();
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={'container ' + `${styles.navbar_socialMedia_container}`}>
          <div className='row'>
            <div className='col-xl-6 col-md-3'>
              <div className={styles.navbar_icon_container}>
                <span className={styles.navbar_socialMedia_icon}>
                  <Facebook size={14} />
                </span>
                <span className={styles.navbar_socialMedia_icon}>
                  <TwitterX size={14} />
                </span>
                <span className={styles.navbar_socialMedia_icon}>
                  <Youtube size={14} />
                </span>
                <span className={styles.navbar_socialMedia_icon}>
                  <Instagram size={14} />
                </span>
              </div>
            </div>
            <div className='col-xl-6 col-md-9'>
              <div className={styles.navbar_adress_details_container}>
                <div className={styles.navbar_adress_text_container}>
                  <span className={styles.navbar_socialMedia_icon}>
                    <GeoAlt size={12} />
                  </span>
                  <span className={styles.navbar_adress_text}>
                    Berlin State2435 B, 11005 Berlin State, Make Alow
                  </span>
                </div>
                <div>
                  <span className={styles.navbar_socialMedia_icon}>
                    <Envelope size={12} />
                  </span>
                  <span className={styles.navbar_adress_text}>
                    medicalTeam@medicalTeam.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header className={"app-header " + `${styles.navbar_navigation_container}`}>
          <div className={'container ' + `${styles.navbar_Navigator_container}`}>
            <div className={styles.navbar_Navigator_menu_container}>
              {headerData && JSON.parse(headerData.value).map((text, ind) => {
                return (
                  <span ref={ref} className={`${styles.homePage_banner_selector_text} ` + `${selectedIndex === ind ? styles.navBar_menu_selected : ''}`} key={ind} onClick={(() => {
                    handleMenuClick(ind, text)
                  })}>
                    {text}
                  </span>
                )
              })}
              {
                showCategories && (
                  <div className={styles.categriesDropDown} ref={ref}>
                    <div>
                      {
                        categories && categories.map((ele, id) => {
                          return (
                            <p key={id} onClick={() => redirect(ele.id)}>{ele.name}</p>
                          )
                        })
                      }

                    </div>
                  </div>
                )
              }
              {
                showBrands && (
                  <div className={styles.brandsDropDown} ref={ref}>
                    <div>
                      {
                        brandData && brandData.map((ele, id) => {
                          return (
                            <p key={id} onClick={() => redirectBrand(ele.id)}>{ele.name}</p>
                          )
                        })
                      }

                    </div>
                  </div>
                )
              }
            </div>
            <div className={styles.navbar_headLogo_text_container}>
              <img className={styles.navbar_headLogo} src={logo} alt='logo' />
              <span className={styles.navbar_head_text}>Health Life</span>
            </div>
            <div className={styles.navbar_pofile_search_section_container}>
              <div className={styles.navbar_search_bar} style={searchText !== '' ? { width: '300px', cursor: 'pointer' } : {}}>
                <input type="search" placeholder="Search here ..." value={searchText} className={searchText !== '' ? `d-block ${styles.navbar_searchbarinput_box}` : `${styles.navbar_searchbarinput_box}`} onChange={(e) => setSearchText(e.target.value)} />
                <Search className={styles.navbar_search_icon} style={searchText !== '' ? {
                  background: 'grey',
                  color: 'white'
                } : {}} />
              </div>
              <span className={styles.navbar_profile_icons} onClick={() => navigateCart()}>
                <Cart size={22} />
                <span className={styles.navbar_cart_amount}>{userCartCount}</span>
              </span>
              {

                profileImage == null ?
                  (<span className={`${styles.navbar_profile_icons} ` + `${styles.navbar_profile_container}`} onClick={handleProfile}>
                    <Person size={18} /></span>)
                  :
                  (<span className={`${styles.navbar_profile_icons} ` + `${styles.navbar_profile_container}`} onClick={handleProfile}>
                    <img className={styles.header_profile_image} src={context.profileImage ? context.profileImage : sessionStorage.getItem('uploadedImage') ? sessionStorage.getItem('uploadedImage') : profileImage} />
                  </span>)
              }

              <span className={styles.navbar_profile_icons}>
                {
                 customerDetails && customerDetails ? (
                    <>
                      <span className={styles.navbar_profile_name}>{custName + ' '}</span>
                      <span><ChevronDown size={13} /></span>
                    </>
                  ) : (
                    <span className={styles.navbar_profile_name} onClick={() => navigate('/')}>Login</span>
                  )
                }
              </span>
            </div>
          </div>
        </header>
        <div></div>
      </div>
    </>
  )
};


export default Header;
