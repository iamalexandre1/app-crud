import type { ComponentPropsWithRef } from 'react';

type InputFieldProps = ComponentPropsWithRef<'input'> & {
  className?: string;
  label: string;
  erroMessage?: string;
};

export default function InputField({
  className,
  label,
  erroMessage,
  ...rest
}: InputFieldProps) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className='text-sm font-medium mb-0.5'> {label} </span>

      <input
        className='bg-transparent shadow-sm border border-gray-300 rounded-xl py-1.5 px-3 dark:border-gray-700'
        {...rest}
      />

      {erroMessage && (
        <span className='text-red-600 text-sm mt-1 dark:text-red-500'>{erroMessage}</span>
      )}
    </label>
  );
}
