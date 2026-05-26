import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  children: string;
  className?: string;
};

export default function Button({ className, children, ...rest }: ButtonProps) {
  // Style
  const styleButton = (className?: string): string => {
    const baseClassName = `
      bg-blue-200 hover:bg-blue-300 text-blue-900 shadow border border-gray-300 
      rounded-xl text-lg font-medium mt-2.5 py-1.5 px-4 h-fit w-fit transition-colors 
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-blue-100 dark:border-gray-700 
      opacity-100 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed
    `;

    return twMerge(baseClassName, className);
  };

  return (
    <button className={styleButton(className)} {...rest}>
      {children}
    </button>
  );
}
