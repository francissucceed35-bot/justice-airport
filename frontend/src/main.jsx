import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

import HomePage from './pages/HomePage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CustomerSignupPage from './pages/CustomerSignupPage.jsx';
import CustomerLoginPage from './pages/CustomerLoginPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <-- NEW

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
      { path: 'contact', element: <ContactUsPage /> },
      {
        path: 'admin', // <-- ADMIN ROUTE
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
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
