import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div
      className={`
        bg-neutral-100 text-neutral-900 h-screen dark:bg-neutral-900 
        dark:text-neutral-50
      `}
    >
      <header className='bg-white dark:bg-neutral-800 shadow border-b border-b-gray-300 dark:border-b-gray-700 rounded-b-lg p-2.5'>
        <div className='mx-auto w-full max-w-4xl'>
          <h1 className='text-3xl font-bold'> App CRUD </h1>
        </div>
      </header>

      <section
        className='pt-4 p-3 overflow-y-auto'
        style={{ height: 'calc(100% - 57px)' }}
      >
        <div className='mx-auto h-full w-full max-w-4xl'>
          <Outlet />
        </div>
      </section>
    </div>
  );
}
