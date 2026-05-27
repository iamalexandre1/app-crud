import { useState, type ReactNode } from 'react';
import type { taskI } from '../types/task';
import { TaskListContext, type TaskListContextProps } from './taskListContext';

type TaskListProviderProps = {
  children: ReactNode;
};

export default function TaskListProvider({ children }: TaskListProviderProps) {
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
  const [taskSelected, setTaskSelected] = useState<taskI>({
    id: '',
    taskTitle: '',
    taskDescription: '',
    taskIsCompleted: false,
  });

  // Actions
  const handleTaskAdd = (dataTask: taskI) => {
    const createTask: taskI = {
      ...dataTask,
      id: `${(Math.random() * 100).toFixed(4)}-${dataTask.taskTitle.trim().replaceAll(' ', '')}`,
    };

    setTaskList((task) => [createTask, ...task]);
  };
  const handleTaskEdit = (dataTask: taskI) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === dataTask.id)
        return {
          ...task,
          taskTitle: dataTask.taskTitle,
          taskDescription: dataTask.taskDescription,
          taskIsCompleted: dataTask.taskIsCompleted,
        };

      return task;
    });

    setTaskList(updatedTaskList);
  };
  const handleTaskDelete = (taskId: string) => {
    const removeTask = taskList.filter((task) => task.id !== taskId);

    setTaskList(removeTask);
  };
  const handleDefineTaskSelected = (dataTask: taskI) => {
    setTaskSelected(dataTask);
  };
  const handleResetTaskSelected = () =>
    setTaskSelected({
      id: '',
      taskTitle: '',
      taskDescription: '',
      taskIsCompleted: false,
    });

  const conextValues: TaskListContextProps = {
    taskList,
    taskSelected,
    handleTaskAdd,
    handleTaskEdit,
    handleTaskDelete,
    handleDefineTaskSelected,
    handleResetTaskSelected,
  };

  return (
    <TaskListContext.Provider value={conextValues}>{children}</TaskListContext.Provider>
  );
}
