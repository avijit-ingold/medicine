import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './AddressDetails.module.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { GenericApiContext } from '../../context/GenericApiContext';

const AddressDetails = () => {
  const [show, setShow] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [userCountries, setUserCountries] = useState();
  const [userCities, setUserCities] = useState();
  const [userState, setUserState] = useState();
  const [hasDefaultAddress, setHasDefaultAddress] = useState();

  const context = useContext(GenericApiContext);

  const phoneNumber = useRef(null);
  const country = useRef(null);
  const city = useRef(null);
  const zipCode = useRef(null);
  const addressName = useRef(null);
  const state = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      "user_id": context.loggedinData.user.id,
      "address": addressName.current.value,
      "country_id": country.current.value,
      "state_id": state.current.value,
      "city_id": city.current.value,
      "postal_code": zipCode.current.value,
      "phone": phoneNumber.current.value
    }
    const url = 'user/shipping/create';

    context.getPostDataWithAuth(url, reqBody, '')
    getUserAddressdetails();
    setShow(false);

  };

  const getUserAddressdetails = () => {
    const url = [
      { url: 'user/shipping/address', name: 'userAddress' },
      { url: 'cities', name: 'cities' },
      { url: 'countries', name: 'countries' },
      { url: 'states', name: 'states' }
    ];

    url.map((ele) => {
      context.getGetData(ele.url, ele.name);
    })
  }

  const deleteAddress = (param) => {
    const url = `user/shipping/delete/${param.id}`
    context.getGetDataQuick(url, '')
    setTimeout(() => {
      getUserAddressdetails();
    }, 300)
  }

  const makeDefault = (param) => {
    const url = 'user/shipping/make_default';

    const reqBody = {
      id: param.id
    }

    context.getPostDataWithAuth(url, reqBody, '')
    setTimeout(() => {
      getUserAddressdetails();
    }, 1300)
  }

  useEffect(() => {
    getUserAddressdetails();
  }, [])

  useEffect(() => {
    if (context.userAddress) {
      setUserAddress(context.userAddress.data.data);
    }
    if (context.cities) {
      setUserCities(context.cities.data.data);
    }
    if (context.countries) {
      setUserCountries(context.countries.data.data);
    }
    if (context.states) {
      setUserState(context.states.data.data)
    }
  }, [context.userAddress, context.cities, context.countries, context.states])

  useEffect(() => {
    if (userAddress.length > 0){
      const defaultAddress = userAddress.find(item => item.set_default == 1)
      setHasDefaultAddress(defaultAddress);
    }
  }, [userAddress])


  return (
    <>
      <div className={styles.address_book}>
        <h2 className={styles.title}>Address Book</h2>

        <div className={styles.default_addresses}>
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
                        T: <a href="tel:676767678">{ele.phone}</a>
                      </p>
                      <a className={styles.change_link}>
                        Change Shipping Address
                      </a>
                    </div>
                  )
                }
              })
              : (
                <h3>No Default Shipping Address Selected</h3>
              )
          }

        </div>

        <div className={styles.additional_addresses}>
          <h3>Additional Address Entries</h3>
          <table className={styles.address_table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Street Address</th>
                <th>City</th>
                <th>Country</th>
                <th>State</th>
                <th>Zip/Postal Code</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                userAddress && userAddress.map((ele, id) => {
                  return (
                    <tr key={id}>
                      <td>{ele.address}</td>
                      <td>{ele.address}</td>
                      <td>{ele.city_name}</td>
                      <td>{ele.country_name}</td>
                      <td>{ele.state_name}</td>
                      <td>{ele.postal_code}</td>
                      <td>{ele.phone}</td>
                      <td>
                        <a className={styles.edit_link}>Edit</a> |{" "}
                        <a className={styles.delete_link} onClick={() => deleteAddress(ele)}>Delete</a>
                        {
                          ele.set_default > 0 ? ('') : (<a className={styles.default_link} onClick={() => makeDefault(ele)}>  |{" "}Make Default</a>)
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className={styles.add_address_btn_container}>
          <button className={styles.add_address_btn} onClick={handleShow}>ADD NEW ADDRESS</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered className={styles.custom_modal_width}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h5>Contact Information</h5>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name </Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name </Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" placeholder="Company" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control type="tel" placeholder="Phone Number" required ref={phoneNumber} />
            </Form.Group>

            <h5>Address</h5>
            <Form.Group className="mb-3" controlId="formStreetAddress">
              <Form.Label>Street Address *</Form.Label>
              <Form.Control type="text" placeholder="Street Address" required ref={addressName} />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country *</Form.Label>
                <Form.Select required ref={country}>
                  <option value="">Select Country</option>
                  {
                    userCountries && userCountries.map((ele, key) => {
                      return (
                        <option key={key} value={ele.id}>{ele.name}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formState">
                <Form.Label>Province *</Form.Label>
                <Form.Select required ref={city}>
                  <option value="">Select Province</option>
                  {
                    userCities && userCities.map((ele, id) => {
                      return (
                        <option key={id} value={ele.id}>{ele.name}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formState">
                <Form.Label>State *</Form.Label>
                <Form.Select required ref={state}>
                  <option value="">Select State</option>
                  {
                    userState && userState.map((ele, id) => {
                      return (
                        <option key={id} value={ele.id}>{ele.name}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formZipCode">
                <Form.Label>Zip/Postal Code *</Form.Label>
                <Form.Control type="text" placeholder="Zip/Postal Code" required ref={zipCode} />
              </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" controlId="formDefaultCheckboxes">
              <Form.Check type="checkbox" label="Use as my default billing address" />
              <Form.Check type="checkbox" label="Use as my default shipping address" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              Save Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default AddressDetails;
