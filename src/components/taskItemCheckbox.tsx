import { FaCheck } from 'react-icons/fa6';

type TaskItemCheckboxProps = {
  checked: boolean;
  onToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TaskItemCheckbox({ checked, onToggle }: TaskItemCheckboxProps) {
  return (
    <div
      onClick={onToggle}
      className={`
        flex items-center justify-center rounded-full cursor-pointer h-7 w-7 transition-all border
        ${
          checked
            ? 'bg-blue-500 dark:bg-blue-700 border-blue-500 text-white shadow-md'
            : 'bg-white dark:bg-[#212121] border-gray-300 dark:border-gray-700 shadow-inner text-transparent'
        }
      `}
    >
      <FaCheck className='text-xs' />
    </div>
  );
}
