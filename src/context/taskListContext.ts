import { createContext, useContext } from 'react';
import type { taskI } from '../types/task';

export type TaskListContextProps = {
  taskList: taskI[];
  taskSelected: taskI;
  handleTaskAdd: (dataTask: taskI) => void;
  handleTaskEdit: (dataTask: taskI) => void;
  handleTaskDelete: (taskId: string) => void;
  handleDefineTaskSelected: (dataTask: taskI) => void;
  handleResetTaskSelected: () => void;
};

export const TaskListContext = createContext<TaskListContextProps>({
  taskList: [],
  taskSelected: {
    id: '',
    taskTitle: '',
    taskDescription: '',
    taskIsCompleted: false,
  },
  handleTaskAdd: () => {},
  handleTaskEdit: () => {},
  handleTaskDelete: () => {},
  handleDefineTaskSelected: () => {},
  handleResetTaskSelected: () => {},
});

export const useTaskList = () => useContext(TaskListContext);
