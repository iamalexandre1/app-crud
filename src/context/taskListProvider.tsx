import { useEffect, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { taskI } from '../assets/types/task';
import { privateAPI } from '../assets/service/api';
import { TaskListContext, type TaskListContextProps } from '../assets/hooks/useTaskList';

type TaskListProviderProps = {
  children: ReactNode;
};

export default function TaskListProvider({ children }: TaskListProviderProps) {
  const [taskList, setTaskList] = useState<taskI[]>([]);
  const [taskSelected, setTaskSelected] = useState<taskI>({
    id: '',
    taskTitle: '',
    taskDescription: '',
    taskIsCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Actions
  const onTaskAdd = (dataTask: taskI, callback?: () => void) => {
    privateAPI
      .addTask(dataTask)
      .then((resp) => {
        setTaskList((task) => [resp.payload, ...task]);
        toast.success(resp.msg);
        callback?.();
      })
      .catch((err) => toast.error(err.message));
  };
  const onTaskEdit = (dataTask: taskI, callback?: () => void) => {
    privateAPI
      .editTask(dataTask)
      .then((resp) => {
        const updatedTask = taskList.map((task) => {
          if (task.id === dataTask.id) {
            return resp.payload;
          }
          return task;
        });

        setTaskList(updatedTask);

        if (callback) toast.success(resp.msg);

        callback?.();
      })
      .catch((err) => toast.error(err.message));
  };
  const onTaskDelete = (taskId: string, callback?: () => void) => {
    privateAPI
      .deleteTask(taskId)
      .then((resp) => {
        const updatedTask = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedTask);
        toast.success(resp.msg);
        callback?.();
      })
      .catch((err) => toast.error(err.message));
  };
  const onDefineTaskSelected = (dataTask: taskI) => setTaskSelected(dataTask);
  const onResetTaskSelected = () =>
    setTaskSelected({
      id: '',
      taskTitle: '',
      taskDescription: '',
      taskIsCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const respFecthTaskList = await privateAPI.getTaskList();

        setTaskList(respFecthTaskList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTaskList();
  }, []);

  const conextValues: TaskListContextProps = {
    taskList,
    taskSelected,
    onTaskAdd,
    onTaskEdit,
    onTaskDelete,
    onDefineTaskSelected,
    onResetTaskSelected,
  };

  return (
    <TaskListContext.Provider value={conextValues}>{children}</TaskListContext.Provider>
  );
}
