import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

import App from '@/App.jsx';
import Error from '@/pages/Error.jsx';
import Home from '@/pages/Home.jsx';
import Inventory from '@/pages/Inventory.jsx';
import Contact from '@/pages/Contact.jsx';
import Update from '@/pages/Update.jsx';
import AllClients from '@/pages/AllClients.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
  cache: new InMemoryCache()
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/Inventory',
        element: <Inventory />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Update',
        element: <Update />
      },
      {
        path: '/clients',
        element: <AllClients />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)