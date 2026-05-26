import { useState, useRef, useEffect, type SubmitEvent } from 'react';
import { FaX, FaTrash } from 'react-icons/fa6';
import type { taskFormI, taskI } from '../types/task';
import InputField from '../components/input';
import { Button, ButtonIcon } from '../components/button';
import TaskItemCheckbox from '../components/taskItemCheckbox';

type DrawerProps = {
  taskSelected: taskI;
  open: boolean;
  onClose: () => void;
  onTaskDelete: (taskId: string) => void;
  onDrawerSubmit: (dataTask: taskFormI) => void;
};

export default function Drawer({
  taskSelected,
  open = false,
  onClose,
  onTaskDelete,
  onDrawerSubmit,
}: DrawerProps) {
  const [taskTitle, setTaskTitle] = useState(taskSelected.taskTitle);
  const [taskDescription, setTaskDescription] = useState(
    taskSelected.taskDescription,
  );
  const [taskIsCompleted, setTaskIsCompleted] = useState(
    taskSelected.taskIsCompleted,
  );
  const drawerRef = useRef<HTMLDivElement>(null);

  // Action
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newTask: taskFormI = {
      taskTitle,
      taskDescription,
      taskIsCompleted,
    };

    onDrawerSubmit(newTask);
  };

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
          <div className='border-b border-b-gray-300 dark:border-b-gray-700 flex justify-between items-center pb-1.5'>
            <TaskItemCheckbox
              checked={taskIsCompleted}
              onToggle={() => setTaskIsCompleted((oldState) => !oldState)}
            />

            <ButtonIcon
              className='text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500'
              disabled={taskSelected.id === ''}
              onClick={() => onTaskDelete(taskSelected.id)}
            >
              <FaTrash className='text-lg' />
            </ButtonIcon>
          </div>

          <form className='pt-4' onSubmit={onSubmit}>
            <InputField
              label='Título'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <InputField
              label='Descrição'
              className='my-2'
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <Button type='submit' className='text-base mt-3.5 ml-auto'>
              {taskSelected.id === '' ? 'Adicionar' : 'Atualizar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
