import { useState, useContext, useEffect } from "react";
import Layout from "./Layout"
import styles from './page.module.css';
import AccountDetails from '../components/AccountDetails/AccountDetails';
import OrderDetails from '../components/OrderDetails/OrderDetails';
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

    const menuArray = ['My Account', 'My Orders', 'My Wish List', 'My Cart', 'Address Book', 'Store Credit', 'Users', 'My Product Reviews']

    const handleSideMenuClick = (index, value) => {
        setSelectedIndex(index);
        setSelectedMenu(value);
    };


    const context = useContext(GenericApiContext);
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (cart === 'cart') {
            setSelectedMenu('My Cart');
            setSelectedIndex(3);
        } else if (cart === 'mywishList') {
            setSelectedMenu('My Wish List');
            setSelectedIndex(2);
        }
        else {
            setSelectedIndex(0);
            setSelectedMenu('My Account');
        }
    }, [cart])



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
                                ) : selectedMenu === 'My Orders' ? (
                                    <>
                                        <OrderDetails />
                                    </>
                                ) : selectedMenu === 'Address Book' ? (
                                    <>
                                        <AddressDetails />
                                    </>
                                ) : selectedMenu === 'Store Credit' ? (
                                    <>
                                        <StoreCredit />
                                    </>
                                ) : selectedMenu === 'Users' ? (
                                    <>
                                        <UsersComponent />
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

