import React from "react";
import Button from "react-bootstrap/Button";
import BSModal from "react-bootstrap/Modal";

function Modal(props) {
  const { show, setShow, children, heading } = props;

  const handleClose = () => setShow(false);

  return (
      <BSModal show={show} onHide={handleClose}>
        <BSModal.Header closeButton>
          <BSModal.Title>{heading ? heading : "Modal heading"}</BSModal.Title>
        </BSModal.Header>
        <BSModal.Body>{children}</BSModal.Body>
        <BSModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </BSModal.Footer>
      </BSModal>
  );
}

export default Modal;
