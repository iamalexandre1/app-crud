import { createBrowserRouter } from 'react-router';
import Layout from '../layout';
import TaskListProvider from '../context/taskListProvider';
import TaskList from '../screen/taskList';
import AuthLayout from '../layout/authLayout';
import AuthLogin from '../screen/authLogin';
import AuthRegister from '../screen/authRegister';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <TaskListProvider>
            <TaskList />
          </TaskListProvider>
        ),
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
