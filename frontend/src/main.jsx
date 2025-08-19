import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

import HomePage from './pages/HomePage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminFlightsListPage from './pages/AdminFlightsListPage.jsx';
import AdminShippingListPage from './pages/AdminShippingListPage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Admin Login
import CustomerSignupPage from './pages/CustomerSignupPage.jsx';
import CustomerLoginPage from './pages.CustomerLoginPage.jsx'; // <-- NEW
import ContactUsPage from './pages/ContactUsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'flights', element: <FlightsPage /> },
      { path: 'shipping', element: <ShippingPage /> },
      { path: 'signup', element: <CustomerSignupPage /> },
      { path: 'login', element: <CustomerLoginPage /> }, // <-- CUSTOMER LOGIN ROUTE
      { path: 'contact', element: <ContactUsPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'admin/flights', element: <AdminFlightsListPage /> },
      { path: 'admin/shipping', element: <AdminShippingListPage /> },
    ],
  },
  {
    path: '/admin/login', // <-- ADMIN LOGIN IS NOW SEPARATE
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
