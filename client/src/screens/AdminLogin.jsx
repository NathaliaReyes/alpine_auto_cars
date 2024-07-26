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
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';


export default function AdminLogin() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const Navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ 
      ...userFormData, 
      [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("user: ", userFormData);

    try {
      const { data } = await login({

        variables: { ...userFormData },
      });
      console.log('data from try: ', data);

      Auth.login(data.login.token);
      console.log('Auth-Login:' , Auth.loggedIn())
    } catch (err) {
      console.error('something happened!!', err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
    // login({ variables: { email, password } })
    // Auth.login(data.login.token)
    // console.log('from the form: ', data.login);
    // console.log(data.login);
    // console.log('Form submitted');
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Login Data:', res);
    setDialogOpen(false); // Close the dialog
    Navigate('/'); // Redirect to the homepage
    // .catch(err => {
    //   console.log('Login Error:', err);
    // });
    // email = '';
    // password = '';
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <a href="#link1" className="flex text-sm opacity-50 mt-3" onClick={() => setDialogOpen(true)}>
        <CogIcon className="w-4 h-4 mr-1" />
        Admin Login
      </a>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: 'white', zIndex: 100 }}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                  // type="password" //check this because is overwriting the style
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
              <Button className="bg-blue-500" type="submit">Login</Button>
              {/* {data && <p>Login Successful</p>} */}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
