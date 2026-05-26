import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';
import type { taskFormI, taskI } from '../types/task';
import Drawer from '../layout/drawer';
import { Button } from '../components/button';
import TaskListItem from '../components/taskListItem';

export default function TaskList() {
  const [taskList, setTaskList] = useState<taskI[]>([
    {
      id: '01',
      taskTitle: 'Item - 01',
      taskDescription: '',
      taskIsCompleted: false,
    },
    {
      id: '02',
      taskTitle: 'Item - 02',
      taskDescription: 'sla',
      taskIsCompleted: false,
    },
  ]);
  const [drawerIsActive, setDrawerIsActive] = useState(false);
  const [taskSelected, setTaskSelected] = useState<taskI>({
    id: '',
    taskTitle: '',
    taskDescription: '',
    taskIsCompleted: false,
  });

  // Actions
  const handleTaskListAdd = (dataTask: taskFormI) => {
    const createID = `${(Math.random() * 100).toFixed(2)}-${dataTask.taskTitle.trim().replaceAll(' ', '')}`;

    const newTask: taskI = {
      id: createID,
      taskTitle: dataTask.taskTitle,
      taskDescription: dataTask.taskDescription,
      taskIsCompleted: dataTask.taskIsCompleted,
    };

    setTaskList((task) => [newTask, ...task]);
  };
  const handleTaskListEdit = (dataTask: taskFormI) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskSelected.id) {
        return {
          ...task,
          taskTitle: dataTask.taskTitle,
          taskDescription: dataTask.taskDescription,
          taskIsCompleted: dataTask.taskIsCompleted,
        };
      }

      return task;
    });

    setTaskList(updatedTaskList);
  };
  const handleTaskDelete = (taskId: string) => {
    const removeTask = taskList.filter((task) => task.id !== taskId);

    setTaskList(removeTask);
    handleDrawerHidde();
  };
  const toggleTaskIsCompleted = (taskId: string) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          taskIsCompleted: !task.taskIsCompleted,
        };
      }

      return task;
    });

    setTaskList(updatedTaskList);
  };
  const handleDrawerSubmit = (dataTask: taskFormI) => {
    if (dataTask.taskTitle === '') {
      toast.error('Título da tarefa é obrigatório', {
        className:
          'dark:bg-neutral-800 dark:text-neutral-50 dark:shadow dark:shadow-gray-800',
      });
      return;
    }

    if (taskSelected.id !== '') {
      handleTaskListEdit(dataTask);
    }

    if (taskSelected.id === '') {
      handleTaskListAdd(dataTask);
    }

    handleDrawerHidde();
  };
  const handleDrawerOpen = (task?: taskI) => {
    if (task) {
      setTaskSelected(task);
    }

    setDrawerIsActive(true);
  };
  const handleDrawerHidde = () => {
    setTaskSelected({
      id: '',
      taskTitle: '',
      taskDescription: '',
      taskIsCompleted: false,
    });
    setDrawerIsActive(false);
  };

  return (
    <>
      <Drawer
        key={taskSelected.id}
        taskSelected={taskSelected}
        open={drawerIsActive}
        onClose={handleDrawerHidde}
        onTaskDelete={handleTaskDelete}
        onDrawerSubmit={handleDrawerSubmit}
      />

      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold mt-1.5'>Lista de Tarefas</h2>

        <Button onClick={() => handleDrawerOpen()}>
          <FaPlus />
          Adicionar
        </Button>
      </div>

      <ul className='py-3'>
        {taskList.map((task) => (
          <TaskListItem
            key={task.id}
            data={task}
            onDrawerTaskEdit={handleDrawerOpen}
            onToggleTaskIsCompleted={toggleTaskIsCompleted}
          />
        ))}
      </ul>

      <Toaster position='top-center' />
    </>
  );
}
