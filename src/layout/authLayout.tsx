import { Outlet } from 'react-router';
import AuthNavigation from '../components/authNavigation';

export default function AuthLayout() {
  return (
    <div
      className={`
        bg-neutral-100 text-neutral-900 pt-4 px-3 h-screen dark:bg-neutral-900 
        dark:text-neutral-50
      `}
    >
      <h1 className='text-3xl font-bold'> App CRUD </h1>

      <div
        className={`
          bg-white shadow-md border border-gray-200 rounded-2xl mx-auto p-3 w-fit 
          dark:bg-neutral-800 dark:border-gray-700
        `}
      >
        <div
          className={`
          bg-neutral-50 border border-gray-200 shadow-sm rounded-3xl flex mx-auto 
            py-0.5 px-1.5 w-fit dark:bg-[#212121] dark:border-gray-700
          `}
        >
          <AuthNavigation to='login'>Login</AuthNavigation>

          <AuthNavigation to='register'>Register</AuthNavigation>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
