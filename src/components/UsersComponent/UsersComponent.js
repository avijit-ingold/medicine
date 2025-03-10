import React, {useState} from 'react';
import styles from './UsersComponent.module.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const UsersComponent = () => {
  const users = [
    {
      id: 12,
      name: 'Ingold Solutions',
      role: 'Company Administrator',
      status: 'Active',
      email: 'demoB2B@ingoldsolutions.com',
      phone: '',
    },
    {
      id: 23,
      name: 'Soroj Jana',
      role: 'Default User',
      status: 'Active',
      email: 'soroj.jana@ingoldsolutions.com',
      phone: '09685968585',
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.user_table_container}>
        <button className={styles.new_user_button} onClick={handleShow}>+ New User</button>
        <table className={styles.user_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Company Role</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className={styles.actions}>
                  <a href="#" className={styles.edit}>Edit</a> |{' '}
                  <a href="#" className={styles.inactive}>Inactivate</a> |{' '}
                  <a href="#" className={styles.delete}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <label htmlFor={styles.perPage}>Show </label>
          <select id="perPage">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span> per page</span>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} centered className={styles.custom_modal_width}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h5>User Information</h5>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control type="text" placeholder="First Name" required />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control type="text" placeholder="Last Name" required />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" placeholder="Job Title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control type="tel" placeholder="Phone Number" required />
            </Form.Group>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="formUserRole">
                <Form.Label>User Role *</Form.Label>
                <Form.Select required>
                  <option value="">Select User Role</option>
                  <option value="DU">Default User</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formUserStatus">
                <Form.Label>Status *</Form.Label>
                <Form.Select required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                </Form.Select>
              </Form.Group>
            </Row>


            <Button variant="primary" type="submit">
              Save Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>

  )
};


export default UsersComponent;
