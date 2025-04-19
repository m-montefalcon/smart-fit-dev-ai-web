import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './redux/store';  

import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';

import './styles.scss';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Provide the store to the app */}
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
