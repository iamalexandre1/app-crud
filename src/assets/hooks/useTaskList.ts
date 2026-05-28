import { createContext, useContext } from 'react';
import type { taskI } from '../types/task';

export type TaskListContextProps = {
  taskList: taskI[];
  taskSelected: taskI;
  onTaskAdd: (dataTask: taskI, callback?: () => void) => void;
  onTaskEdit: (dataTask: taskI, callback?: () => void) => void;
  onTaskDelete: (taskId: string, callback?: () => void) => void;
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  onTaskAdd: () => {},
  onTaskEdit: () => {},
  onTaskDelete: () => {},
  onDefineTaskSelected: () => {},
  onResetTaskSelected: () => {},
});

export const useTaskList = () => useContext(TaskListContext);
