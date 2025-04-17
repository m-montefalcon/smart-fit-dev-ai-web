import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';

import "./styles.scss";
// Set up your routes here
const router = createBrowserRouter([
  {
    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },  
    ],
  },
]);

// Render the app wrapped with RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
