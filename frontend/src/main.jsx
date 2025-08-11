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
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CustomerSignupPage from './pages/CustomerSignupPage.jsx';
import CustomerLoginPage from './pages/CustomerLoginPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import CustomerSettingsPage from './pages/CustomerSettingsPage.jsx';
import CustomerProtectedRoute from './components/CustomerProtectedRoute.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'flights', element: <FlightsPage /> },
      { path: 'shipping', element: <ShippingPage /> },
      { path: 'signup', element: <CustomerSignupPage /> },
      { path: 'login', element: <CustomerLoginPage /> },
      { path: 'payment-success', element: <PaymentSuccessPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
      { 
        element: <CustomerProtectedRoute />,
        children: [{ path: 'settings', element: <CustomerSettingsPage /> }]
      },
      { 
        element: <ProtectedRoute />,
        children: [
          { path: 'admin', element: <AdminDashboardPage /> },
          { path: 'admin/flights', element: <AdminFlightsListPage /> },
          { path: 'admin/shipping', element: <AdminShippingListPage /> },
        ]
      }
    ],
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
