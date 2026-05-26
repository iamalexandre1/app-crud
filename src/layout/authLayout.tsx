import { NavLink, Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className='bg-neutral-100 text-neutral-900 pt-4 px-3 h-screen'>
      <h1 className='text-3xl font-bold'> App CRUD </h1>

      <div className='bg-white shadow-md border border-gray-200 rounded-2xl mx-auto p-3 w-fit'>
        <div className='bg-neutral-50 border border-gray-200 shadow-sm rounded-3xl flex mx-auto py-0.5 px-1.5 w-fit'>
          <NavLink
            to='login'
            className={({ isActive }) => `
              rounded-3xl text-lg font-medium py-1.5 px-4 transition-colors
              ${!isActive && 'bg-neutral-50 hover:bg-neutral-200'}
              ${isActive && 'bg-blue-200 hover:bg-blue-300 '}
            `}
          >
            Login
          </NavLink>

          <NavLink
            to='register'
            className={({ isActive }) => `
              rounded-3xl text-lg font-medium py-1.5 px-4 transition-colors
              ${!isActive && 'bg-neutral-50 hover:bg-neutral-200'}
              ${isActive && 'bg-blue-200 hover:bg-blue-300 '}
            `}
          >
            Register
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
