import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTaskList } from '../context/taskListContext';
import TaskItemCheckbox from './taskItemCheckbox';
import { ButtonIcon, Button } from './button';
import InputField from './input';
import type { taskI } from '../assets/types/task';

// Schema
const validationSchema = Yup.object({
  taskTitle: Yup.string()
    .max(20, 'Muito longo. Deve ter no máximo 20 caracteres')
    .required('Campo obrigatório'),
  taskDescription: Yup.string(),
  taskIsCompleted: Yup.boolean().required('Campo obrigatório'),
});

type DrawerFormProps = {
  drawerIsOpen?: boolean;
  onDrawerClose: () => void;
};

export default function DrawerForm({ drawerIsOpen, onDrawerClose }: DrawerFormProps) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { taskSelected, onTaskDelete, onTaskAdd, onTaskEdit } = useTaskList();
  const {
    values,
    resetForm,
    setFieldValue,
    handleSubmit,
    getFieldProps,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      taskTitle: taskSelected.taskTitle,
      taskDescription: taskSelected.taskDescription,
      taskIsCompleted: taskSelected.taskIsCompleted,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoadingSubmit(true);

      const createTask: taskI = {
        ...values,
        id: taskSelected.id,
        createdAt: taskSelected.createdAt,
        updatedAt: taskSelected.updatedAt,
      };
      const onSuccess = () => onDrawerClose();

      const request =
        taskSelected.id !== ''
          ? onTaskEdit(createTask, onSuccess)
          : onTaskAdd(createTask, onSuccess);

      request.finally(() => setIsLoadingSubmit(false));
    },
  });

  // Actions
  const handleTaskDelete = () => {
    setIsLoadingDelete(true);

    onTaskDelete(taskSelected.id, onDrawerClose).finally(() => setIsLoadingDelete(false));
  };

  useEffect(() => {
    if (drawerIsOpen) return;

    resetForm(); // Cuida do fluxo: adicionar → digitar → fechar → adicionar de novo.
  }, [drawerIsOpen, resetForm]);

  return (
    <>
      <div className='border-b border-b-gray-300 dark:border-b-gray-700 flex justify-between items-center pb-1.5'>
        <TaskItemCheckbox
          checked={values.taskIsCompleted}
          onToggle={() => setFieldValue('taskIsCompleted', !values.taskIsCompleted)}
        />

        <ButtonIcon
          className='text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500'
          disabled={taskSelected.id === ''}
          isLoading={isLoadingDelete}
          onClick={handleTaskDelete}
        >
          <FaTrash className='text-lg' />
        </ButtonIcon>
      </div>

      <form className='pt-4' onSubmit={handleSubmit}>
        <InputField
          label='Título'
          erroMessage={
            touched.taskTitle && errors.taskTitle ? errors.taskTitle : undefined
          }
          {...getFieldProps('taskTitle')}
        />

        <InputField
          label='Descrição'
          className='my-2'
          {...getFieldProps('taskDescription')}
        />

        <Button
          type='submit'
          isLoading={isLoadingSubmit}
          disabled={isLoadingSubmit}
          className='text-base mt-3.5 ml-auto'
        >
          {taskSelected.id === '' ? 'Adicionar' : 'Atualizar'}
        </Button>
      </form>
    </>
  );
}
