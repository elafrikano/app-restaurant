import React from "react";

import { Modal, ProgressBar } from "react-bootstrap";

function LoadingModal({ show, handleClose }) {
  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header>
        <Modal.Title>Aguarde por favor...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar variant="danger" animated now={100} />
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
