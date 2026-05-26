type ButtonProps = {
  type?: 'button' | 'submit';
  className?: string;
  isDisabled?: boolean;
  children: string;
  onClick?: () => void;
};

export default function Button({
  type = 'button',
  isDisabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        bg-blue-200 text-blue-900 shadow border border-gray-300 
        rounded-xl text-lg font-medium self-end mt-2.5 py-1.5 px-4 h-fit w-fit
        transition-colors
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'}  
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
