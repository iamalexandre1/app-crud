import type { taskI } from '../types/task';

// Mock data
const taskList: taskI[] = [
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
];

interface respAddTaskI {
  msg: string;
  payload: taskI;
}

// API
export const privateAPI = {
  getTaskList: (): Promise<taskI[]> => {
    return new Promise((resolve) =>
      /*
       * Retorna um Deep Copy (cópia profunda) para isolar a memória do mock da memória do React.
       * Sem isso, mutações locais (como .push no addTask) alteram o estado do React por tabela,
       * gerando duplicidade quando o Contexto executa o 'setTaskList'.
       */
      setTimeout(() => resolve(JSON.parse(JSON.stringify(taskList))), 800),
    );
  },
  addTask: async (dataTask: Omit<taskI, 'id'>): Promise<respAddTaskI> => {
    if (dataTask.taskTitle === '') throw new Error('Título é um campo obrigatório');

    const createId = `
      ${(Math.random() * 100).toFixed(4)}-
      ${Date.now().toString()}-
      ${dataTask.taskTitle.toLowerCase().trim().replaceAll(' ', '')}
    `;
    const createTask: taskI = {
      ...dataTask,
      id: createId,
    };

    taskList.push({ ...createTask });

    const resp: respAddTaskI = {
      msg: 'Tarefa adicionada com sucesso!',
      payload: createTask,
    };

    return new Promise((resolve) => setTimeout(() => resolve(resp), 800));
  },
  editTask: async (dataTask: taskI): Promise<respAddTaskI> => {
    if (dataTask.taskTitle === '') throw new Error('Título é um campo obrigatório');

    const findTaskIndex = taskList.findIndex((task) => task.id === dataTask.id);

    if (findTaskIndex === -1) throw new Error('Tarefa não encontrada');

    taskList[findTaskIndex].taskTitle = dataTask.taskTitle;
    taskList[findTaskIndex].taskDescription = dataTask.taskDescription;
    taskList[findTaskIndex].taskIsCompleted = dataTask.taskIsCompleted;

    const resp: respAddTaskI = {
      msg: 'Tarefa atualizada com sucesso!',
      payload: taskList[findTaskIndex],
    };

    return new Promise((resolve) => setTimeout(() => resolve(resp), 800));
  },
  deleteTask: async (taskId: string): Promise<Omit<respAddTaskI, 'payload'>> => {
    const findTaskIndex = taskList.findIndex((task) => task.id === taskId);

    if (findTaskIndex === -1) throw new Error('Tarefa não encontrada');

    taskList.splice(findTaskIndex, 1);

    return new Promise((resolve) =>
      setTimeout(() => resolve({ msg: 'Tarefa apagada com sucesso!' }), 800),
    );
  },
};
