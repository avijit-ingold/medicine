import React, { useEffect, useState } from "react";
import { GenericApiContext } from "./GenericApiContext";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import GenericLoader from "../components/GenericLoader/GenericLoader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GenericApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [postResultData, setPostResultData] = useState(null);
    const [registrationData, setRegistrationData] = useState(null);
    const [getHomeData, setGetHomeData] = useState(null);
    const [getCategoryData, setGetCategoryData] = useState(null);
    const [ifLoggedin, setIfLoggedIn] = useState(false);
    const [getHeaderdata, setGetHeaderData] = useState(null);
    const [getBrandData, setGetBrandData] = useState(null);
    const [getTodayDealData, setGetTodayDealData] = useState(null);
    const [getBlogList, setGetBlogList] = useState(null);
    const [getFaqList, setFaqList] = useState(null);
    const [getProductDetails, setProductDetails] = useState(null);
    const [getRelatedProducts, setRelatedProducts] = useState(null);
    const [getProductReview, setGetProductReview] = useState(null);
    const [getCategoryDetails, setGetCategoryDetails] = useState(null);
    const [loggedinData, setLoggedInData] = useState([]);
    const [ifWishListed, setIfWishListed] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [filterData, setFilterData] = useState();
    const [cartList, setCartList] = useState(null);
    const [wishList, setWishList] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [states, setStates] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [purchaseHistory, setPurchaseHistory] = useState(null);
    const [returnData, setReturnData] = useState(null);
    const [addToCartSuccess, setAddToCartSuccess] = useState(false)
    const [customerData, setCustomerData] = useState(null);
    const [adminToken, setAdminToken] = useState();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderList, setOrderList] = useState(null);
    const [logout, setLogout] = useState(null);


    const getAdminPostData = async (url, requestBody, parent) => {
        setLoading(true);
        getAdminToken();
        console.log(url)
        const headers = {
            "Content-Type": "application/json",
            "System-Key": "12345",
            "Authorization": `Bearer ${sessionStorage.getItem('AdminToken')}`
        };

        axios({
            method: 'POST',
            url: url,
            data: JSON.stringify(requestBody),
            headers: headers
        }).then((res) => {
            if (parent == 'registration') {
                toast.success('Successfully Registered!', {
                    autoClose: 1100
                });
                setRegistrationData(res)
                setLogout(false);
            } else if (parent == 'login') {
                setPostResultData(res)
                setLogout(false);
                sessionStorage.setItem('CustomerToken', res.data);
            }
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
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => {
                clearTimeout(timer)
            };
        });

    }

    const getCustomerData = async (url, parent) => {
        setLoading(true);
        const headers = {
            "Content-Type": "application/json",
            "System-Key": "12345",
            "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
        };

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + url,
            headers: headers
        }).then((res) => {
            if (parent == 'wishList') {
                setWishList(res)
            } else if (parent == 'countries') {
                setCountries(res)
            } else {
                setCustomerData(res)
            }
        }).finally(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => {
                clearTimeout(timer)
            };
        });

    }

    const getAdminToken = async () => {
        const headers = {
            "Content-Type": "application/json",
            "System-Key": "12345"
        };

        const requestBody = {
            "username": "admin",
            "password": "option123@"
        };

        axios({
            method: 'POST',
            url: '/integration/admin/token',
            data: JSON.stringify(requestBody),
            headers: headers
        }).then((res) => {
            setAdminToken(res.data);
            sessionStorage.setItem('AdminToken', res.data);
        }).finally(() => {
        });

    }

    const getPostDataWithAuth = async (url, requestBody, parent) => {
        checkIfLoggedIn();
        const headers = {
            "Content-Type": "application/json",
            "System-Key": "12345",
            "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
        };

        axios({
            method: parent == 'changePassword' ? 'PUT' : 'POST',
            url: process.env.REACT_APP_API_URL + url,
            data: JSON.stringify(requestBody),
            headers: headers
        }).then((res) => {
            if (parent === 'addAddress') {
                if (res) {
                    toast.success('Successful', {
                        autoClose: 1100
                    });
                } else {
                    toast.error("Something Went Wrong!", {
                        autoClose: 1100
                    });
                }
            } else if (parent === 'addToCart') {
                if (res) {
                    toast.success('Successful', {
                        autoClose: 1100
                    });
                } else {
                    toast.error("Something Went Wrong!", {
                        autoClose: 1100
                    });
                }
            } else if (parent == 'changePassword') {
                if (res) {
                    toast.success('Successful', {
                        autoClose: 1100
                    });
                } else {
                    toast.error("Something Went Wrong!", {
                        autoClose: 1100
                    });
                }
            } else {
                if (res.data.result) {
                    toast.success(res.data.message, {
                        autoClose: 1100
                    });
                } else {
                    toast.error("Something Went Wrong!", {
                        autoClose: 1100
                    });
                }
                if (parent === 'addToCart') {
                    handleCart();
                    setAddToCartSuccess(true)
                }
                if (parent === 'imageUpload') {
                    setProfileImage(res.data.path);
                    sessionStorage.setItem('uploadedImage', res.data.path);
                }
            }
        }).catch((err) => {
            toast.error(`Error: ${err.message || "Something went wrong!"}`);
            console.error(err);
            setAddToCartSuccess(false)
        }).finally(() => {

        });

    }

    const getGetData = async (url, type) => {
        setLoading(true);
        let headers;
        checkIfLoggedIn();

        headers = {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "System-Key": "12345",
            "Authorization": `Bearer ${sessionStorage.getItem('AdminToken')}`,
        };

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URL + url,
            headers: headers
        }).then((res) => {
            if (type === 'homeBanner') {
                setGetHomeData(res)
            }
            else if (type === 'categories') {
                setGetCategoryData(res)
            }
            else if (type === 'headerMenu') {
                setGetHeaderData(res)
            }
            else if (type === 'brandData') {
                setGetBrandData(res)
            }
            else if (type === 'todaysDeal') {
                setGetTodayDealData(res)
            }
            else if (type === 'bloglist') {
                setGetBlogList(res)
            }
            else if (type === 'faqlist') {
                setFaqList(res)
            }
            else if (type === 'productDetails') {
                setProductDetails(res)
            }
            else if (type === 'relatedProducts') {
                setRelatedProducts(res)
            }
            else if (type === 'productReviewDetails') {
                setGetProductReview(res)
            }
            else if (type === 'categoryDetails') {
                setGetCategoryDetails(res)
            }
            else if (type === 'getWishList') {
                setIfWishListed(res.data.is_in_wishlist)
            }
            else if (type === 'filter') {
                setFilterData(res)
            }
            else if (type === 'cartData') {
                setCartList(res)
            }
            else if (type === 'cities') {
                setCities(res)
            }

            else if (type === 'states') {
                setStates(res)
            }
            else if (type === 'purchaseHistory') {
                setPurchaseHistory(res);
            }
            else if (type === 'return') {
                setReturnData(res)
            }
            else if (type === 'orderDetails') {
                setOrderDetails(res)
            }
            else if (type === 'orderList') {
                setOrderList(res)
            }
        }).finally(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => {
                clearTimeout(timer)
            };
        });



    }


    const getPostDataQuick = async (url, type, reqBody) => {
        setLoading(true);
        checkIfLoggedIn();
        const headers = {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`,
        };

        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + url,
            headers: headers,
            data: reqBody ? JSON.stringify(reqBody) : ''
        }).then((res) => {
            if (type === 'sad') {
                toast.error(`Removed From WishList` + "! 😔", {
                    icon: "😢",
                    autoClose: 1100,
                    style: {
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        border: "1px solid #f5c6cb",
                    },
                });
            } else if (type === 'userAddress') {
                setUserAddress(res)
            } else if (type == 'addWishList') {
                if (res) {
                    toast.success('Successfully Added to Wishlist', {
                        autoClose: 1100
                    });
                }
            } else if (type == 'paymentMethod') {
                setPaymentMethod(res)
            } else if (type == 'logout') {
                if (res.data) {
                    toast.success('Successfully Logged Out', {
                        autoClose: 1100
                    });
                    setCustomerData(null)
                    setPostResultData(null)
                    setLogout(res)
                    setCartCount(0)
                }
            }
        }).catch((err) => {
            toast.error(`Error: ${err.message || "Something went wrong!"}`);
            console.error(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleCart = () => {
        if (sessionStorage.getItem('QuoteID')) {
            checkIfLoggedIn();
            // if (ifLoggedin) {
            const headers = {
                "Content-Type": "application/json",
            };

            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_URL + `b2c/cartlist?cartid=${sessionStorage.getItem('QuoteID')}&loggin=true`, // you got cart id dusring add to cart
                headers: headers
            }).then((res) => {
                if (res.data[0]) {
                    setCartCount(parseInt(res.data[0].total_qty))
                    setCartList(res)
                } else {
                    toast.error("Something Went Wrong!", {
                        autoClose: 1500
                    });
                }
            }).catch((err) => {
                toast.error(`Error: ${err.message || "Something went wrong!"}`);
                console.error(err);
            }).finally(() => {

            });
            // }

        }


    }

    const handleDeleteCart = async (url, type) => {
        checkIfLoggedIn();
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('CustomerToken')}`
        };

        axios({
            method: 'DELETE',
            url: process.env.REACT_APP_API_URL + url,
            headers: headers
        }).then((res) => {
            handleCart();
            if (type === 'sad') {
                const msg = 'Successfully Removed'
                toast.error(`${msg}` + "! 😔", {
                    icon: "😢",
                    autoClose: 1000,
                    style: {
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        border: "1px solid #f5c6cb",
                    },
                });
            } else {
                toast.success(res.data.message, {
                    autoClose: 1500
                });
            }
        }).catch((err) => {
            toast.error(`Error: ${err.message || "Something went wrong!"}`);
            console.error(err);
        }).finally(() => {
        });
    }


    const checkIfLoggedIn = () => {
        setIfLoggedIn(sessionStorage.getItem('loginDetails') ? true : false);
        setLoggedInData(sessionStorage.getItem('loginDetails'));
    }

    useEffect(() => {
        getAdminToken()
    }, [])

    const values = {
        getAdminPostData,
        getPostDataWithAuth,
        getCustomerData,
        customerData,
        postResultData,
        registrationData,
        checkIfLoggedIn,
        loggedinData,
        ifLoggedin,
        loading,
        getGetData,
        getPostDataQuick,
        handleDeleteCart,
        handleCart,
        getHomeData,
        getCategoryData,
        getHeaderdata,
        getBrandData,
        getTodayDealData,
        getBlogList,
        getFaqList,
        getProductDetails,
        getRelatedProducts,
        getProductReview,
        getCategoryDetails,
        ifWishListed,
        cartCount,
        filterData,
        cartList,
        wishList,
        userAddress,
        cities,
        countries,
        states,
        profileImage,
        purchaseHistory,
        returnData,
        addToCartSuccess,
        paymentMethod,
        orderDetails,
        orderList,
        logout,
        setLoading,
        setCartCount
    }

    useEffect(() => {
        checkIfLoggedIn();
        return handleCart()
    }, [ifLoggedin])

    useEffect(() => {
        checkIfLoggedIn();
    }, [])

    return (
        <GenericApiContext.Provider value={values}>
            <div style={{ position: 'relative' }}>
                {loading && (
                    <div style={{
                        position: 'fixed',
                        height: '100vh',
                        width: '100%',
                        background: '#0000006b',
                        zIndex: '99999',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'radial-gradient(circle farthest-corner at center, #3C4B57 0%, #1c262b82 100%)'
                    }}>
                        <GenericLoader />
                    </div>)
                }
                <ToastContainer />
                <div>{children}</div>
            </div>
        </GenericApiContext.Provider >
    )
}

export default GenericApiProvider;