import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';

function DraggableModal({ 
  show, 
  handleClose, 
  title, 
  children, // For rendering dynamic content
  modalWidth = "500px" // Default width, but can be customized
}) {
  const [dragging, setDragging] = useState(false);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null); // Reference to the modal

  const startDrag = (e) => {
    setDragging(true);
    setOffsets({
      x: e.clientX - modalRef.current.getBoundingClientRect().left,
      y: e.clientY - modalRef.current.getBoundingClientRect().top,
    });
  };

  const drag = (e) => {
    if (dragging) {
      const newX = e.clientX - offsets.x;
      const newY = e.clientY - offsets.y;
      modalRef.current.style.left = `${newX}px`;
      modalRef.current.style.top = `${newY}px`;
    }
  };

  const stopDrag = () => {
    setDragging(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="draggable-modal" // Adding a custom class for styling
      style={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: modalWidth // Set the modal width dynamically
      }}
      ref={modalRef}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <Modal.Header closeButton onMouseDown={startDrag}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column" style={{ height: 'auto' }}>
        {children} {/* Render dynamic content passed as children */}
      </Modal.Body>
    </Modal>
  );
}

export default DraggableModal;
