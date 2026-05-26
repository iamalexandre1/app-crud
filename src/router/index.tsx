import { createBrowserRouter } from 'react-router';
import Layout from '../layout';
import AuthLayout from '../layout/authLayout';
import AuthLogin from '../screen/authLogin';
import AuthRegister from '../screen/authRegister';
import TaskList from '../screen/taskList';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <TaskList />,
      },
    ],
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
