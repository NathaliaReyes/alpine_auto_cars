import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import { Input } from "@/components/ui/input"

import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className='m-10 p-10'>
      <Input
        type="email"
        className="mb-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        className="mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="bg-blue-500" type="submit">Login</Button>
      {data && <p>Login Successful</p>}
    </form>
  );
};

export default LoginForm;