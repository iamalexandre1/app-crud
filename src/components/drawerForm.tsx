import { useState, type SubmitEvent } from 'react';
import { FaTrash } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import type { taskI } from '../assets/types/task';
import { useTaskList } from '../assets/hooks/useTaskList';
import TaskItemCheckbox from './taskItemCheckbox';
import { ButtonIcon, Button } from './button';
import InputField from './input';

type DrawerFormProps = {
  drawerIsOpen?: boolean;
  onDrawerClose: () => void;
};

export default function DrawerForm({ onDrawerClose }: DrawerFormProps) {
  const { taskSelected, onTaskDelete, onTaskAdd, onTaskEdit } = useTaskList();
  const [taskTitle, setTaskTitle] = useState(taskSelected.taskTitle);
  const [taskDescription, setTaskDescription] = useState(taskSelected.taskDescription);
  const [taskIsCompleted, setTaskIsCompleted] = useState(taskSelected.taskIsCompleted);

  // Actions
  const handleTaskDelete = () => onTaskDelete(taskSelected.id, onDrawerClose);
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (taskTitle === '') {
      toast.error('Título da tarefa deve ser preenchido');
      return;
    }

    const createTask: taskI = {
      ...taskSelected,
      taskTitle,
      taskDescription,
      taskIsCompleted,
    };

    if (taskSelected.id !== '') {
      onTaskEdit(createTask, onDrawerClose);
      return;
    }

    onTaskAdd(createTask, onDrawerClose);
  };

  return (
    <>
      <div className='border-b border-b-gray-300 dark:border-b-gray-700 flex justify-between items-center pb-1.5'>
        <TaskItemCheckbox
          checked={taskIsCompleted}
          onToggle={() => setTaskIsCompleted((oldState) => !oldState)}
        />

        <ButtonIcon
          className='text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500'
          disabled={taskSelected.id === ''}
          onClick={handleTaskDelete}
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
    </>
  );
}
