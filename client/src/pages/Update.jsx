import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');


import { useQuery } from '@apollo/client';
import { GET_CARS } from '@/utils/queries';

import UpdateCarList from '@/components/update/UpdateCarCard';
import { Button } from "@/components/ui/button";
import NewCarForm from '@/components/update/NewCarForm';
import '../styles/carForm.css';

function Update() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, data, refetch, error } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log('GraphQL Error:', error);
    return <p>Error: {error.message}</p>
  }

  const cars = data?.cars || {};

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div style={{ zIndex: 10 }}>
        <div className='flex justify-center'>
          <Button
            className="sm:w-full lg:w-1/4 bg-white border-2 rounded-lg border-blue-500 hover:border-blue-300 text-blue-500 hover:bg-blue-800 hover:text-white transition-colors mt-10 mb-10 pt-4 pb-4"
            onClick={openModal}
          >
            Add a New Vehicle
          </Button>
        </div>
        <UpdateCarList refetchCars={refetch} cars={cars} />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add New Car"
          className="modal bg-white md:p-2 w-full sm:w-1/2 lg:w-1/3"
          overlayClassName="modal-overlay"
        >
          <NewCarForm closeModal={closeModal} refetchCars={refetch} />
        </Modal>
      </div>
    </>
  );
}

export default Update;