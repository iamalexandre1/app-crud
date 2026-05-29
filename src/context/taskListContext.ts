import { createContext, useContext } from 'react';
import type { taskI } from '../assets/types/task';

export type TaskListContextProps = {
  taskList: taskI[];
  taskSelected: taskI;
  isLoadingTaskList: boolean;
  onTaskAdd: (dataTask: taskI, callback?: () => void) => Promise<void>;
  onTaskEdit: (dataTask: taskI, callback?: () => void) => Promise<void>;
  onTaskDelete: (taskId: string, callback?: () => void) => Promise<void>;
  onDefineTaskSelected: (dataTask: taskI) => void;
  onResetTaskSelected: () => void;
};

export const TaskListContext = createContext<TaskListContextProps>({
  taskList: [],
  taskSelected: {
    id: '',
    taskTitle: '',
    taskDescription: '',
    taskIsCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  isLoadingTaskList: false,
  onTaskAdd: () => Promise.resolve(),
  onTaskEdit: () => Promise.resolve(),
  onTaskDelete: () => Promise.resolve(),
  onDefineTaskSelected: () => {},
  onResetTaskSelected: () => {},
});

export const useTaskList = () => useContext(TaskListContext);
