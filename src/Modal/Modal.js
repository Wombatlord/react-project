import React from "react";
import Button from "react-bootstrap/Button";
import _Modal from "react-bootstrap/Modal";

function Modal(props) {
  const { show, setShow, children } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <_Modal show={show} onHide={handleClose}>
        <_Modal.Header closeButton>
          <_Modal.Title>Modal heading</_Modal.Title>
        </_Modal.Header>
        <_Modal.Body>{children}</_Modal.Body>
        <_Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </_Modal.Footer>
      </_Modal>
    </>
  );
}

export default Modal;
