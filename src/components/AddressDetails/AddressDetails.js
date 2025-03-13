import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './AddressDetails.module.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { GenericApiContext } from '../../context/GenericApiContext';
import axios from "axios";
import { toast } from "react-toastify";

const AddressDetails = () => {
  const [show, setShow] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [userCountries, setUserCountries] = useState();
  const [userState, setUserState] = useState();
  const [hasDefaultAddress, setHasDefaultAddress] = useState();
  const [allAddress, setAllAddress] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [billingChecked, setBillingChecked] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false)
  const [addressId, setAddressId] = useState('');

  const context = useContext(GenericApiContext);

  const phoneNumber = useRef(null);
  const country = useRef(null);
  const zipCode = useRef(null);
  const addressName = useRef(null);
  const state = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const companyName = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIsEditAddress(false)
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      "addressData": {
        "region": {
          "region_code": null,
          "region": "ddd",
          "region_id": 0
        },
        "country_id": country.current.value ? country.current.value : '',
        "street": [
          addressName.current.value ? addressName.current.value : ''
        ],
        "company": companyName.current.value ? companyName.current.value : '',
        "telephone": phoneNumber.current.value ? phoneNumber.current.value : '',
        "postcode": zipCode.current.value ? zipCode.current.value : '',
        "city": state.current ? state.current.value : '',
        "firstname": firstName.current.value ? firstName.current.value : '',
        "lastname": lastName.current.value ? lastName.current.value : '',
        "default_shipping": 0,
        "default_billing": 0
      }
    }
    if (!isEditAddress) {
      const loginDetails = JSON.parse(sessionStorage.getItem('loginDetails'))
      const url = `create-address/${loginDetails.id}?defaultShipping=${billingChecked ? 1 : 0}&defaultBilling=${billingChecked ? 1 : 0}`;
      context.getPostDataWithAuth(url, reqBody, 'addAddress')
      setTimeout(() => {
        getCustomerDetails()
      }, 1000)
      setShow(false);
    } else {
      const url = `update-address/${addressId}?defaultShipping=${billingChecked ? 1 : 0}&defaultBilling=${billingChecked ? 1 : 0}`;
      updateAddress(url, reqBody)
      setTimeout(() => {
        getCustomerDetails()
      }, 1000)
      setShow(false);
    }
  };

  const updateAddress = async (url, reqBody) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem('AdminToken')}`
    };

    axios({
      method: 'PUT',
      url: process.env.REACT_APP_API_URL + url,
      data: JSON.stringify(reqBody),
      headers: headers
    }).then((res) => {
      if (res) {
        toast.success('Successfully Updated Address', {
          autoClose: 1100
        });
      } else {
        toast.error("Something Went Wrong!", {
          autoClose: 1100
        });
      }

    }).catch((err) => {
      toast.error(`Error: ${err.message || "Something went wrong!"}`);
      console.error(err);
    }).finally(() => {

    });
  }

  const getCustomerDetails = async () => {
    const url = 'customers/me'

    context.getCustomerData(url);
  }

  const getUserAddressdetails = () => {
    const url = 'directory/countries'

    context.getCustomerData(url, 'countries');
  }

  const getAvailableRegions = (countryId) => {
    const country = userCountries.find(c => c.id === countryId);
    setUserState(country && country.available_regions ? country.available_regions : []);
  }

  const handleShippingChange = (e) => {
    setBillingChecked(e.target.checked);
  };

  const getStateCode = (stateName) => {
    const state = userState.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
    return state ? state.code : "State not found";
  };

  const handleEditAddresss = (param) => {
    setIsEditAddress(true)
    setAddressId(param.id)
    setShow(true);
    setTimeout(() => {
      if (country.current) {
        country.current.value = param.country_id ? param.country_id : '';
      }
      if (phoneNumber.current) {
        phoneNumber.current.value = param.telephone ? param.telephone : '';
      }
      if (zipCode.current) {
        zipCode.current.value = param.postcode ? param.postcode : '';
      }
      if (addressName.current) {
        addressName.current.value = param.street[0] ? param.street[0] : '';
      }
      if (state.current) {
        getAvailableRegions(param.country_id)
        state.current.value = param.country_id ? getStateCode(param.country_id) : '';
      }
      if (firstName.current) {
        console.log(param.firstName)
        firstName.current.value = param.firstname ? param.firstname : '';
      }
      if (lastName.current) {
        lastName.current.value = param.lastname ? param.lastname : '';
      }
      if (companyName.current) {
        companyName.current.value = param.company ? param.company : '';
      }
    }, 200)


  }


  const deleteAddress = (id) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem('AdminToken')}`
    };

    axios({
      method: 'DELETE',
      url: process.env.REACT_APP_API_URL + `addresses/${id}`,
      headers: headers
    }).then((res) => {
      if (res) {
        toast.success('Successfully Deleted Address', {
          autoClose: 1100
        });
      } else {
        toast.error("Something Went Wrong!", {
          autoClose: 1100
        });
      }

    }).catch((err) => {
      toast.error(`Error: ${err.message || "Something went wrong!"}`);
      console.error(err);
    }).finally(() => {
      setTimeout(() => {
        getCustomerDetails()
      }, 1000)
    });

  }


  useEffect(() => {
    getCustomerDetails()
    getUserAddressdetails()
  }, [])

  useEffect(() => {
    if (context.customerData) {
      setCustomerDetails(context.customerData.data)
      setAllAddress(context.customerData.data.addresses)
      const validAddresses = context.customerData.data.addresses.filter(
        (address) => address.default_billing && address.default_shipping
      );
      if (validAddresses.length > 0) {
        setHasDefaultAddress(true);
      } else {
        setHasDefaultAddress(false);
      }
      setUserAddress(validAddresses)
    }
  }, [context.customerData])

  useEffect(() => {
    if (context.countries) {
      setUserCountries(context.countries.data)
    }
  }, [context.countries])

  return (
    <>
      <div className={styles.address_book}>
        <h2 className={styles.title}>Address Book</h2>

        <div className={styles.default_addresses}>
          {
            hasDefaultAddress ?
              userAddress && userAddress.map((ele, key) => {
                return (
                  <div key={key} className={styles.default_address_card}>
                    <h3>Default Shipping Address</h3>
                    <p>{ele.firstname + ' ' + ele.lastname}</p>
                    <p>{ele.street[0]}</p>
                    <p>{ele.city}</p>
                    <p>{ele.street[0]},{ele.city},{ele.postcode}</p>
                    <p>{ele.country_id}</p>
                    <p>
                      T: <a href="tel:676767678">{ele.telephone}</a>
                    </p>
                    <a className={styles.change_link}>
                      Change Shipping Address
                    </a>
                  </div>
                )
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
                allAddress && allAddress.map((ele, id) => {
                  return (
                    <tr key={id}>
                      <td>{ele.firstname + ' ' + ele.lastname}</td>
                      <td>{ele.street[0]}</td>
                      <td>{ele.city}</td>
                      <td>{ele.country_id}</td>
                      <td>{ele.city}</td>
                      <td>{ele.postcode}</td>
                      <td>{ele.telephone}</td>
                      <td>


                        {
                          !ele.default_shipping && (<>
                            <a className={styles.delete_link} onClick={() => deleteAddress(ele.id)}>Delete</a>
                            <a className={styles.edit_link} onClick={() => handleEditAddresss(ele)}> | Edit</a>
                          </>)
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
                <Form.Control type="text" placeholder="First Name" ref={firstName} />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name </Form.Label>
                <Form.Control type="text" placeholder="Last Name" ref={lastName} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" placeholder="Company" ref={companyName} />
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
                <Form.Select required ref={country} onChange={(e) => getAvailableRegions(e.target.value)}>
                  <option value="">Select Country</option>
                  {
                    userCountries && userCountries.map((ele, key) => {
                      return (
                        <option key={key} value={ele.id}>{ele.full_name_english}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              {
                country.current?.value && (
                  <Form.Group as={Col} controlId="formState">
                    <Form.Label>State *</Form.Label>
                    {
                      userState && userState.length > 0 ? (
                        <Form.Select required ref={state}>
                          <option value="">Select State</option>
                          {
                            userState && userState.map((ele, id) => {
                              return (
                                <option key={id} value={ele.name}>{ele.name}</option>
                              )
                            })
                          }
                        </Form.Select>
                      ) : (
                        <Form.Control type="text" placeholder="State" required ref={state} />
                      )
                    }

                  </Form.Group>
                )
              }

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formZipCode">
                <Form.Label>Zip/Postal Code *</Form.Label>
                <Form.Control type="text" placeholder="Zip/Postal Code" required ref={zipCode} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formDefaultCheckboxes">
              <Form.Check checked={billingChecked}
                onChange={handleShippingChange} type="checkbox" label="Use as my default billing and Shipping address" />
            </Form.Group>
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
