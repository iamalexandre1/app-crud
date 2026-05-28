import { useRef, useEffect } from 'react';
import { FaX } from 'react-icons/fa6';
import { useTaskList } from '../assets/hooks/useTaskList';
import DrawerForm from '../components/drawerForm';
import { ButtonIcon } from '../components/button';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function Drawer({ open = false, onClose }: DrawerProps) {
  const { taskSelected } = useTaskList();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close Drawer when click outside
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (open && drawerRef.current) {
        if (!drawerRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return (
    <div
      className={`
        absolute top-0 left-0 h-screen overflow-hidden w-full transition-all
        ${open && 'bg-black/15 pointer-events-auto'}
        ${!open && 'bg-black/0 pointer-events-none'}
      `}
    >
      <div
        ref={drawerRef}
        className={`
          bg-neutral-100 dark:bg-neutral-900 shadow border-l border-l-gray-300 dark:border-l-gray-700 rounded-l-2xl absolute top-0 
          overflow-hidden h-full w-72 transition-all
          ${open && 'right-0'}
          ${!open && '-right-full'}
        `}
      >
        <div className='bg-white dark:bg-neutral-800 shadow border-b border-b-gray-300 dark:border-b-gray-700 flex items-center p-3'>
          <ButtonIcon onClick={onClose}>
            <FaX className='text-inherit' />
          </ButtonIcon>

          <h3 className='text-lg font-semibold ml-1'>
            {taskSelected.id === '' ? 'Adicionar' : 'Atualizar'}
            Tarefa
          </h3>
        </div>

        <div className='pt-4 p-3'>
          <DrawerForm onDrawerClose={onClose} />
        </div>
      </div>
    </div>
  );
}
