import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/App.jsx';
import Error from '@/pages/Error.jsx';
import Home from '@/pages/Home.jsx';
import Inventory from '@/pages/Inventory.jsx';
import Contact from '@/pages/Contact.jsx';
import Update from '@/pages/Update.jsx'

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
      // {
      //   path: '/About',
      //   element: <About />
      // },
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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)