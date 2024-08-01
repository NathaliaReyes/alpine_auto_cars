import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CogIcon } from '@heroicons/react/solid';
import { ADD_USER } from '@/utils/mutations';
import AlertDestructive from '@/components/admin/AlertAuth';

export default function AdminSignup({ dialogOpen, setDialogOpen }) {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const [showAlert, setShowAlert] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      setDialogOpen(false); // Close the signup dialog
      setSuccessDialogOpen(true); // Open the success dialog
    } catch (err) {
      setShowAlert(true);
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);

    setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    navigate('/'); // Redirect to the homepage
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: 'white', zIndex: 100 }}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="mb-3 text-blue-600 font-bold">Login</DialogTitle>
              <DialogDescription>
                Welcome, please enter in the following credentials to gain access to the admin dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Admin01"
                  className="col-span-3"
                  value={userFormData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Admin@email.com"
                  className="col-span-3"
                  value={userFormData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="********"
                  className="col-span-3"
                  value={userFormData.password}
                  onChange={handleInputChange}
                  style={{ WebkitTextSecurity: 'disc' }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-blue-500" type="submit">Sign Up</Button>
            </DialogFooter>
          </form>
          {showAlert && <AlertDestructive />}
        </DialogContent>
      </Dialog>

      <Dialog open={successDialogOpen} onOpenChange={handleSuccessDialogClose}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: 'white', zIndex: 100 }}>
          <DialogHeader>
            <DialogTitle className="mb-3 text-green-600 font-bold">Success</DialogTitle>
            <DialogDescription>
              The new admin user has been created successfully. <br></br><br></br> Credentials for login are: <br></br><br></br><strong>Email: {userFormData.email} <br></br><br></br>Password: {userFormData.password}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="bg-green-500" onClick={handleSuccessDialogClose}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}