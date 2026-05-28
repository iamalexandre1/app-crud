import { FaChevronRight, FaT } from 'react-icons/fa6';
import { useTaskList } from '../assets/hooks/useTaskList';
import type { taskI } from '../assets/types/task';
import { ButtonIcon } from './button';
import TaskItemCheckbox from './taskItemCheckbox';

type TaskListItemProps = {
  data: taskI;
  onDrawerTaskEdit?: (data: taskI) => void;
};

export default function TaskListItem({ data, onDrawerTaskEdit }: TaskListItemProps) {
  const { onTaskEdit } = useTaskList();

  // Actions
  const onTaskToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    onTaskEdit({ ...data, taskIsCompleted: !data.taskIsCompleted });
  };

  return (
    <li
      className={`
        bg-transparent hover:bg-neutral-200 rounded-lg flex gap-1.5 pb-0 p-2 transition-colors
        dark:hover:bg-neutral-800
      `}
      onClick={() => onDrawerTaskEdit && onDrawerTaskEdit(data)}
    >
      <TaskItemCheckbox checked={data.taskIsCompleted} onToggle={onTaskToggle} />

      <div className='border-b border-b-gray-300 dark:border-b-gray-700 flex-1 pb-2.5 min-w-0'>
        <div className='flex items-center gap-2 overflow-hidden'>
          <p className='text-lg font-medium overflow-hidden text-ellipsis text-nowrap leading-snug'>
            {data.taskTitle}
          </p>

          <ButtonIcon className='ml-auto'>
            <FaChevronRight />
          </ButtonIcon>
        </div>

        {data.taskDescription && (
          <div className='flex gap-1 pt-1'>
            <div className='bg-green-50 text-green-900 shadow rounded-3xl flex items-center text-sm font-medium pr-3 overflow-hidden h-fit'>
              <span className='bg-green-200 shadow-inner rounded-r-xl mr-1 py-1.5 px-1.5 h-full'>
                <FaT size={12} />
              </span>
              Descrição
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
