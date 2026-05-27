import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Toaster } from 'react-hot-toast';
import type { taskI } from '../types/task';
import { useTaskList } from '../context/taskListContext';
import { Button } from '../components/button';
import TaskListItem from '../components/taskListItem';
import Drawer from '../layout/drawer';

export default function TaskList() {
  const [drawer, setDrawer] = useState(false);
  // Evita o bug: abrir drawer → digitar → fechar → abrir e manter valores antigos.
  // Incrementamos esse contador ao abrir para remontar o form e re-aplicar valores iniciais.
  const [enableReinitialize, setEnableReinitialize] = useState(0);
  const { taskList, handleDefineTaskSelected, handleResetTaskSelected } = useTaskList();

  // Actions
  const handleDrawerOpen = () => {
    setDrawer(true);
    setEnableReinitialize((prev) => prev + 1);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
    handleResetTaskSelected();
  };
  const onDrawerTaskEdit = (dataTask: taskI) => {
    handleDefineTaskSelected(dataTask);
    handleDrawerOpen();
  };

  return (
    <>
      <Drawer key={enableReinitialize} open={drawer} onClose={handleDrawerClose} />

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold mt-1.5'>Lista de Tarefas</h2>

        <Button onClick={handleDrawerOpen}>
          <FaPlus />
          Adicionar
        </Button>
      </div>

      <ul className='py-3'>
        {taskList.map((task) => (
          <TaskListItem key={task.id} data={task} onDrawerTaskEdit={onDrawerTaskEdit} />
        ))}
      </ul>

      <Toaster position='bottom-center' />
    </>
  );
}
