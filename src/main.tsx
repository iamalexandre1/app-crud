import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import MainRoutes from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={MainRoutes} />

    <Toaster position='bottom-center' />
  </StrictMode>,
);
