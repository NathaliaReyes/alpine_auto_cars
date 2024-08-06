import React from 'react';
import Modal from 'react-modal';
import '../../styles/modal.css';

const CustomModal = ({ isOpen, onClose, onConfirm, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      {children}
      <div className="modal-footer">
        <button onClick={onClose} className="modal-button bg-gray-500 text-white hover:bg-gray-700">Cancel</button>
        <button onClick={onConfirm} className="modal-button bg-red-500 text-white hover:bg-red-700">Confirm</button>
      </div>
    </Modal>
  );
};

export default CustomModal;