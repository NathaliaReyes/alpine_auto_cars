import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Modal from '@/components/update/CustomModal'; // Ensure this path is correct

function DeleteCarForm({ carId, onDelete }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = () => {
    // Call your delete API here with carId
    onDelete(carId);
    closeModal();
  };

  return (
    <>
      <Button variant="outline" onClick={openModal}>Delete</Button>
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteCarForm;