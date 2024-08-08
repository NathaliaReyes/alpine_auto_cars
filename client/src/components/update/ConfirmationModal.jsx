import React from 'react';
import { Button } from '@/components/ui/button';

import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
   } from '@/components/ui/dialog';


const ConfirmationModal = ({ errors, onConfirm, onCancel }) => (
    <Dialog className="z-50" open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
      <DialogContent className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600">Incomplete Fields</DialogTitle>
          <DialogDescription>
            <ul className="list-disc pl-5 mt-2">
              {errors.map((error, index) => (
                <li key={index} className="text-red-500">{error}</li>
              ))}
            </ul>
            <p className="mt-4">Are you sure you want to submit the form with these fields incomplete?</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancel} className="bg-gray-500 text-white hover:bg-gray-700">Cancel</Button>
          <Button onClick={onConfirm} className="bg-blue-500 text-white hover:bg-blue-700 ml-2">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  export default ConfirmationModal;