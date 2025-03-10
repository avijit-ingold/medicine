import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderMobile.module.css';
import { CaretDown, GeoAlt, Envelope, Search, Cart, Person, ChevronDown } from 'react-bootstrap-icons';
import { GenericApiContext } from '../../context/GenericApiContext';
import logo from '../../../src/assets/images/Medical/logo.jpg'

const HeaderMobile = () => {

  const [menuActive, setMenuActive] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [custName, setCustName] = useState();
  const [headerData, setHeaderData] = useState();

  const context = useContext(GenericApiContext);

  var loginDetails = []

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleAfterLogin = (param) => {
    setCustName(getInitials(param.user.name));
  }

  const getInitials = (name) => {
    var parts = name.split(' ')
    var initials = ''
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0]
      }
    }
    return initials
  }

  useEffect(() => {
    if (context.getHeaderdata) {
      setHeaderData(context.getHeaderdata.data.data.find(item => item.type === "header_menu_labels"));
    }
  }, [context.getHeaderdata])


  useEffect(() => {
    loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
    if (loginDetails) {
      handleAfterLogin(loginDetails);
    }
  }, [])


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
            <div className={styles.navbar_headLogo_text_container}>
              <img className={styles.navbar_headLogo} src={logo} alt='logo' />
              <span className={styles.navbar_head_text}>Health Life</span>
            </div>
            <div className={styles.navbar_pofile_search_section_container}>
              <div className={styles.navbar_search_bar}>
                <input type="search" placeholder="Search here" value={searchText} className={`${styles.navbar_searchbarinput_box} `} onChange={(e) => setSearchText(e.target.value)} />
                <Search className={styles.navbar_search_icon} />
              </div>
              <span className={styles.navbar_profile_icons}>
                <Cart size={18} />
              </span>
              <span className={`${styles.navbar_profile_icons} ` + `${styles.navbar_profile_container}`}>
                <Person size={18} />
              </span>
              <span className={styles.navbar_profile_icons}>
                <span className={styles.navbar_profile_name}>{context.ifLoggedin ? custName + ' ' : 'Login'}</span>
                {
                  context.ifLoggedin && (
                    <span><ChevronDown size={13} /></span>
                  )
                }
              </span>
            </div>
          </div>
        </div>

        <nav className={styles.mobile_menu + " " + (menuActive ? styles.active : "")}>
          <ul className={styles.mobile_menu_list}>
            <li>
              <a href="">Home</a>
            </li>
            <li className={styles.has_children} onClick={toggleSubmenu}>
              <span className={styles.li_about} >About <span className={styles.icon_arrow + " " + (submenuOpen ? styles.open : "")}><CaretDown /></span></span>
              <ul className={styles.children + " " + (submenuOpen ? styles.active : "")}>
                <li className='border-0'><a href="">Submenu #1</a></li>
                <li className='border-0'><a href="">Submenu #2</a></li>
                <li className='border-0'><a href="">Submenu #3</a></li>
              </ul>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
        <div className={(menuActive ? styles.blurBackground : "d-none")} onClick={toggleMenu}></div>
      </header>
    </>
  )
};


export default HeaderMobile;
