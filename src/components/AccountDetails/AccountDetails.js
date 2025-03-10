import React, { useState, useContext, useEffect } from 'react';
import styles from './AccountDetails.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash, Camera } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [hasDefaultAddress, setHasDefaultAddress] = useState();
  const [show, setShow] = useState(false);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [wishListData, setWishListData] = useState();
  const [recentlyBought, setRecentlyBought] = useState(null);

  const context = useContext(GenericApiContext);
  const location = useLocation();

  const navigate = useNavigate();

  const getAddress = () => {
    const url = 'user/shipping/address';
    if(context.ifLoggedin){
    context.getGetDataQuick(url, 'userAddress');
    }
  }

  const getWishListDetails = () => {
    const url = 'wishlists'
    if(context.ifLoggedin){
    context.getGetDataQuick(url, 'wishList');
    }
  }

  const getOrderDetails = () => {
    const url = 'purchase-history'
    if(context.ifLoggedin){
      context.getGetData(url, 'purchaseHistory');
    }
  }

  const handleClose = () => setShow(false);

  useEffect(() => {
    getAddress();
    getWishListDetails();
    getOrderDetails();
  }, [])

  useEffect(() => {
    if (context.wishList) {
      setWishListData(context.wishList.data.data);
    }
  }, [context.wishList])


  const handleModalClose = () => setImageModalShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'profile/update';
    const reqBody = {
      "id": context.loggedinData.user.id,
      "name": context.loggedinData.user.name,
      "password": confirmPassword
    }

    context.getPostDataWithAuth(url, reqBody, '')
    handleClose();
  };

  const convertToBase64 = (file) => {
    setSpinnerLoading(true)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result);
      setSpinnerLoading(false)
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    convertToBase64(e.target.files[0]);
  }

  const handleImageModalSubmit = (e) => {

    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image to upload!");
      return;
    }

    // Handle image upload logic here (e.g., sending the image to a server)

    const url = 'profile/update-image';
    const reqBody = {
      "id": context.loggedinData.user.id,
      "filename": selectedFile.name,
      "image": base64Image.split(',')[1]
    }

    context.getPostDataWithAuth(url, reqBody, 'imageUpload')

    // Reset the form and close the modal after successful upload
    setSelectedFile(null);
    handleModalClose();
  };

  useEffect(() => {
    if (context.userAddress) {
      setUserAddress(context.userAddress.data.data);
    }
  }, [context.userAddress])

  useEffect(() => {
    if (userAddress.length > 0) {
      const defaultAddress = userAddress.find(item => item.set_default == 1)
      setHasDefaultAddress(defaultAddress);
    }
  }, [userAddress])

  useEffect(() => {
    if (context.purchaseHistory) {
      setRecentlyBought(context.purchaseHistory.data.data)
    }
  }, [context.purchaseHistory])



  return (
    <>

      <div className={styles.account_dashboard + ' container'}>
        <h1 className={styles.title}>My Account</h1>

        <section className={styles.account_info}>
          <div className={styles.section_heading_container}>
            <h3>Account Information</h3>

          </div>
          {
            context.loggedinData && context.loggedinData.user && (
              <div className={styles.info_card}>
                <div className={styles.details_card}>
                  <h3>Contact Information</h3>
                  <p>{context.loggedinData.user.name}</p>
                  <p>{context.loggedinData.user.email}</p>
                  <div className={styles.info_actions}>
                    <a>Edit</a> | <a onClick={() => setShow(true)}>Change Password</a>
                  </div>
                </div>
                <div className={styles.profile_image_container_main}>
                  <div className={styles.profile_image_container} onClick={() => setImageModalShow(true)}>
                    <img className={styles.profile_image} src={context.profileImage ? context.profileImage : sessionStorage.getItem('uploadedImage') ? sessionStorage.getItem('uploadedImage') : context.loggedinData.user.avatar_original} />
                    <span className={styles.profile_change_image}><Camera color='white' /></span>
                  </div>
                </div>
              </div>
            )
          }
        </section>

        <section className={styles.address_book}>
          <div className={styles.section_heading_container}>
            <h3>Address Book</h3>
          </div>
          <div className={styles.address_container}>
            <div className={styles.address_card}>

              {
                hasDefaultAddress ?
                  userAddress && userAddress.map((ele, key) => {
                    if (ele.set_default > 0) {
                      return (
                        <div key={key} className={styles.default_address_card}>
                          <h3>Default Shipping Address</h3>
                          <p>{ele.address}</p>
                          <p>{ele.city_name}</p>
                          <p>{ele.city_name},{ele.state_name},{ele.postal_code}</p>
                          <p>{ele.country_name}</p>
                          <p>
                            T: <a style={{ textDecoration: 'none' }}>{ele.phone}</a>
                          </p>
                        </div>
                      )
                    }
                  })
                  : (
                    <h3>No Default Shipping Address Selected</h3>
                  )
              }
            </div>

          </div>
        </section>

        <section className={styles.recent_reviews}>
          <div className={styles.section_heading_container}>
            <h3>My Recent Reviews</h3>
            <a className={styles.view_all}>VIEW ALL</a>
          </div>
          <div className={styles.review_card}>
            <p style={{ margin: "0" }}>Product1</p>
          </div>
        </section>

        <section className={styles.recent_reviews}>
          <div className={styles.section_heading_container}>
            <h3>My Wish List</h3>
            <a className={styles.view_all} onClick={() => navigate('/myProfile/mywishList')}>VIEW ALL</a>
          </div>
          <div className={styles.my_wishlist}>
            {wishListData && wishListData.map((product, key) => {
              return (
                <div className={styles.wishlist_card} key={product.product.id}>
                  <div className={styles.wishlist_image}>
                    <img src={product.product.thumbnail_image} alt={product.product.name} />
                    {/* <button className={styles.delete_btn} onClick={() => removeWishList(product.product.id)}>🗑</button> */}
                  </div>
                  <div className={styles.wishlist_info}>
                    <h3>{product.product.name}</h3>
                    <p>{product.product.base_price}</p>
                  </div>
                </div>
              )
            })}
          </div>


        </section>

        <section className={styles.recent_orders}>
          <div className={styles.section_heading_container}>
            <h3>Recent Orders</h3>
            <a className={styles.view_all}>VIEW ALL</a>
          </div>
          <table className={styles.orders_table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Payment Type</th>
                <th>Payment Status</th>
                <th>Order Total</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentlyBought && recentlyBought.map((item, id) => {
                return (
                  <tr key={id}>
                    <td>{item.code}</td>
                    <td>{item.date}</td>
                    <td>{item.payment_type}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.grand_total}</td>
                    <td>{item.delivery_status}</td>
                    <td>
                      <a href="#">View Order</a> | <a href="#">Reorder</a>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </section>
      </div>

      {/* MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <InputGroup className={styles.modal_inputField}>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div
                  className={styles.modal_eye_container}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ?
                    (<Eye />) : (<EyeSlash />)
                  }
                </div>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup className={styles.modal_inputField}>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className={styles.modal_eye_container}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ?
                    (<Eye />) : (<EyeSlash />)
                  }
                </div>
              </InputGroup>
              {
                newPassword != confirmPassword ? (<span className={styles.warning}>Your Passwords Dont Match</span>) : ''
              }

            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal >

      {/* IMAGE MODAL */}
      <Modal show={imageModalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleImageModalSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an image to upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            {selectedFile && (
              <div className="mb-3">
                <strong>Selected File:</strong> {selectedFile.name}
              </div>
            )}
            {
              spinnerLoading ? (<>
                <button
                  disabled={spinnerLoading} // Disable button while loading
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: spinnerLoading ? "#ccc" : "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: spinnerLoading ? "not-allowed" : "pointer",
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className={styles.spinner}
                    ></span>
                    Uploading...
                  </div>

                </button>
              </>)
                :
                (
                  <Button variant="primary" type='submit'>
                    Upload
                  </Button>
                )
            }

          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};


export default AccountDetails;
