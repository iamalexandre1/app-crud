import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import type { taskI } from '../assets/types/task';
import { useTaskList } from '../context/taskListContext';
import { Button } from '../components/button';
import TaskListItem from '../components/taskListItem';
import Drawer from '../layout/drawer';

export default function TaskList() {
  const [drawer, setDrawer] = useState(false);
  const { taskList, isLoadingTaskList, onDefineTaskSelected, onResetTaskSelected } =
    useTaskList();

  // Actions
  const handleDrawerOpen = () => setDrawer(true);
  const handleDrawerClose = () => {
    setDrawer(false);
    onResetTaskSelected();
  };
  const onDrawerTaskEdit = (dataTask: taskI) => {
    onDefineTaskSelected(dataTask);
    handleDrawerOpen();
  };

  return (
    <>
      <Drawer open={drawer} onClose={handleDrawerClose} />

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold mt-1.5'>Lista de Tarefas</h2>

        <Button onClick={handleDrawerOpen}>
          <FaPlus />
          Adicionar
        </Button>
      </div>

      <ul className='py-3'>
        {isLoadingTaskList && (
          <div className='border-4 border-t-transparent border-blue-400 rounded-full mx-auto w-8 h-8 animate-spin'></div>
        )}

        {!isLoadingTaskList &&
          taskList.map((task) => (
            <TaskListItem key={task.id} data={task} onDrawerTaskEdit={onDrawerTaskEdit} />
          ))}

        {!isLoadingTaskList && taskList.length === 0 && (
          <p className='text-lg font-medium text-center'> Nenhuma tarefa registrada </p>
        )}
      </ul>
    </>
  );
}
