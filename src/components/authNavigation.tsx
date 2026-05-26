import { NavLink, type NavLinkRenderProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

type AuthNavigationProps = {
  to: string;
  children: string;
};

export default function AuthNavigation({ to, children }: AuthNavigationProps) {
  // Style
  const styleClassName = ({ isActive }: NavLinkRenderProps) => {
    const baseClassName = `
      bg-neutral-50 hover:bg-neutral-200 dark:bg-[#212121] dark:hover:bg-neutral-900 
      rounded-3xl text-lg font-medium py-1.5 px-4 transition-colors
    `;

    const styleIsActive =
      'bg-blue-200 hover:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700';

    return twMerge(baseClassName, isActive ? styleIsActive : '');
  };

  return (
    <NavLink to={to} className={styleClassName}>
      {children}
    </NavLink>
  );
}
