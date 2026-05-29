import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

export function Button({ className, isLoading, children, ...rest }: ButtonProps) {
  // Style
  const styleButton = (className?: string): string => {
    const baseClassName = `
      bg-blue-200 hover:bg-blue-300 text-blue-900 shadow border border-gray-300 
      rounded-xl flex gap-1.5 items-center text-lg font-medium py-1.5 px-4 
      h-fit w-fit transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 
      dark:text-blue-100 dark:border-gray-700 opacity-100 cursor-pointer 
      disabled:opacity-70 disabled:cursor-not-allowed
    `;

    return twMerge(baseClassName, className);
  };

  return (
    <button className={styleButton(className)} {...rest}>
      {!isLoading && children}

      {isLoading && (
        <div className='border-2 border-t-transparent border-blue-900 rounded-full w-5 h-5 animate-spin'></div>
      )}
    </button>
  );
}

export function ButtonIcon({ className, isLoading, children, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        `bg-black/0 text-neutral-500 dark:text-neutral-200 hover:bg-black/10 hover:text-neutral-600
        dark:hover:text-neutral-300 rounded-full p-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed`,
        className,
      )}
      {...rest}
    >
      {!isLoading && children}

      {isLoading && (
        <div className='border-2 border-t-transparent border-blue-400 rounded-full w-5 h-5 animate-spin'></div>
      )}
    </button>
  );
}
