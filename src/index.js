import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import OrdersSection from './components/OrdersSection';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import OrderForm from './components/OrderForm';
import LoginForm from './components/LoginForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/orders",
        element: <OrderForm />
      }
    ]
  },
  {
    path: "/orders",
    element: <OrdersSection />
  }
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);