import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/authLayout';
import AuthLogin from '../screen/authLogin';
import AuthRegister from '../screen/authRegister';

export default createBrowserRouter([
  {
    path: '/',
    element: <h1> Home </h1>,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <AuthLogin />,
      },
      {
        path: 'register',
        element: <AuthRegister />,
      },
    ],
  },
]);
