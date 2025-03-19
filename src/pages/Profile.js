import { useState, useContext, useEffect } from "react";
import Layout from "./Layout"
import styles from './page.module.css';
import AccountDetails from '../components/AccountDetails/AccountDetails';
import AddressDetails from "../components/AddressDetails/AddressDetails";
import StoreCredit from "../components/StoreCredit/StoreCredit";
import UsersComponent from "../components/UsersComponent/UsersComponent";
import ProductReviewComponent from "../components/ProductReviewComponent/ProductReviewComponent";
import WishlistComponent from "../components/WishlistComponent/WishlistComponent";
import { GenericApiContext } from "../context/GenericApiContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CartComponent from "../components/CartComponent/CartComponent";

const Profile = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState('My Account');

    const { cart } = useParams();

    const menuArray = ['My Account', 'My Wish List', 'My Cart', 'Address Book', 'My Product Reviews', 'Logout']

    const handleSideMenuClick = (index, value) => {
        setSelectedIndex(index);
        setSelectedMenu(value);
        if (value == 'My Wish List') {
            navigate('/myProfile/mywishList')
        } else if (value == 'My Account') {
            navigate('/myProfile')
        } else if (value == 'My Cart') {
            navigate('/myProfile/cart')
        } else if (value == 'Address Book') {
            navigate('/myProfile/addressBook')
        } else if (value == 'Store Credit') {
            navigate('/myProfile/storeCredit')
        } else if (value == 'My Product Reviews') {
            navigate('/myProfile/productReviews')
        } else if (value == 'Logout') {
            handleLogout()
        }
    };

    const handleLogout = () => {
        const url = 'integration/customer/revoke-customer-token';
        context.getPostDataQuick(url, 'logout')
    }


    const context = useContext(GenericApiContext);
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (cart === 'cart') {
            setSelectedMenu('My Cart');
            setSelectedIndex(2);
        } else if (cart === 'mywishList') {
            setSelectedMenu('My Wish List');
            setSelectedIndex(1);
        } else if (cart === 'addressBook') {
            setSelectedMenu('Address Book');
            setSelectedIndex(3);
        } else if (cart === 'storeCredit') {
            setSelectedMenu('Store Credit');
            setSelectedIndex(4);
        } else if (cart === 'productReviews') {
            setSelectedMenu('My Product Reviews');
            setSelectedIndex(4);
        } else {
            setSelectedIndex(0);
            setSelectedMenu('My Account');
        }
    }, [cart])

    useEffect(() => {
        if (context.logout) {
            sessionStorage.removeItem('CustomerToken');
            sessionStorage.removeItem('QuoteID');
            sessionStorage.removeItem('loginDetails');
            navigate('/')
        }
    }, [context.logout])



    return (
        <>
            <Layout>
                <>
                    <div className={styles.profile_container + " container"}>
                        <div className={styles.sidebar}>
                            <ul className={styles.sidebar_menu}>
                                {
                                    menuArray && menuArray.map((ele, ind) => {
                                        return (
                                            <li key={ind} className={styles.menu_item + ' ' + (selectedIndex === ind ? styles.active : '')} onClick={() => handleSideMenuClick(ind, ele)}>{ele}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={styles.page_content}>
                            {
                                selectedMenu && selectedMenu === 'My Account' ? (
                                    <>
                                        <AccountDetails />
                                    </>
                                ) : selectedMenu === 'Address Book' ? (
                                    <>
                                        <AddressDetails />
                                    </>
                                ) : selectedMenu === 'My Product Reviews' ? (
                                    <>
                                        <ProductReviewComponent />
                                    </>
                                ) : selectedMenu === 'My Wish List' ? (
                                    <>
                                        <WishlistComponent />
                                    </>
                                ) : selectedMenu === 'My Cart' ? (
                                    <>
                                        < CartComponent />
                                    </>
                                ) : ''
                            }
                        </div>
                    </div>
                </>
            </Layout>
        </>
    )
}

export default Profile;

