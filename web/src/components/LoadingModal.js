import React from "react";

import { Modal, ProgressBar } from "react-bootstrap";

function LoadingModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="text-center">
          Aguardá un momento, por favor.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar variant="danger" animated now={100} />
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
