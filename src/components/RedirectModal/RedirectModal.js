import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RedirectModal = ({ show, location }) => {
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setRedirecting(true);
        setTimeout(() => {
          navigate('/login',{ state: { from: location }, replace: true })
        }, 2000);
      }, 200);
    }
  }, [show]);

  return (
    <Modal show={show} centered>
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Kindly Login to access this feature</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {redirecting ? (
          <>
            <p>Redirecting...</p>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <p>Please wait...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RedirectModal;
