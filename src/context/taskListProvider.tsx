import { useEffect, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { taskI } from '../assets/types/task';
import { privateAPI } from '../assets/service/api';
import { TaskListContext, type TaskListContextProps } from './taskListContext';

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoadingTaskList, setIsLoadingTaskList] = useState(true);

  // Actions
  const onTaskAdd = async (dataTask: taskI, callback?: () => void) => {
    return await privateAPI
      .addTask(dataTask)
      .then((resp) => {
        setTaskList((task) => [resp.payload, ...task]);
        toast.success(resp.msg);
        callback?.();
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  const onTaskEdit = async (dataTask: taskI, callback?: () => void) => {
    return await privateAPI
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
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  const onTaskDelete = async (taskId: string, callback?: () => void) => {
    return await privateAPI
      .deleteTask(taskId)
      .then((resp) => {
        const updatedTask = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedTask);
        toast.success(resp.msg);
        callback?.();
      })
      .catch((err) => {
        toast.error(err.message);
        throw err;
      });
  };

  const onDefineTaskSelected = (dataTask: taskI) => setTaskSelected(dataTask);
  const onResetTaskSelected = () =>
    setTaskSelected({
      id: '',
      taskTitle: '',
      taskDescription: '',
      taskIsCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

  useEffect(() => {
    const fetchTaskList = async () => {
      setIsLoadingTaskList(true);

      try {
        const respFetchTaskList = await privateAPI.getTaskList();

        setTaskList(respFetchTaskList);
      } catch (err) {
        toast.error(err.message);
      }

      setIsLoadingTaskList(false);
    };

    fetchTaskList();
  }, []);

  const contextValues: TaskListContextProps = {
    taskList,
    taskSelected,
    isLoadingTaskList,
    onTaskAdd,
    onTaskEdit,
    onTaskDelete,
    onDefineTaskSelected,
    onResetTaskSelected,
  };

  return (
    <TaskListContext.Provider value={contextValues}>{children}</TaskListContext.Provider>
  );
}
