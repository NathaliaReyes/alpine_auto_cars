import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import UpdateCarList from '@/components/update/UpdateCarCard';
import { Button } from "@/components/ui/button";
import NewCarForm from '@/components/update/NewCarForm';
import '../styles/carForm.css';

Modal.setAppElement('#root'); // Ensure this matches your root element

function Update() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className='flex justify-center'>
        <Button
          className="sm:w-full lg:w-1/4 bg-white border-2 rounded-lg border-blue-500 hover:border-blue-300 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors mt-10 mb-10 pt-4 pb-4"
          onClick={openModal}
        >
          Add a New Vehicle
        </Button>
      </div>
      <UpdateCarList />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Car"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <NewCarForm closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default Update;