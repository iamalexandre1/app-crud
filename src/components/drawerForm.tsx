import { FaTrash } from 'react-icons/fa6';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTaskList } from '../assets/hooks/useTaskList';
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

export default function DrawerForm({ onDrawerClose }: DrawerFormProps) {
  const { taskSelected, onTaskDelete, onTaskAdd, onTaskEdit } = useTaskList();
  const {
    values,
    setFieldValue,
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      taskTitle: taskSelected.taskTitle,
      taskDescription: taskSelected.taskDescription,
      taskIsCompleted: taskSelected.taskIsCompleted,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const createTask: taskI = {
        ...values,
        id: taskSelected.id,
        createdAt: taskSelected.createdAt,
        updatedAt: taskSelected.updatedAt,
      };

      if (taskSelected.id !== '') {
        onTaskEdit(createTask, onDrawerClose);
        return;
      }

      onTaskAdd(createTask, onDrawerClose);
    },
  });

  // Actions
  const handleTaskDelete = () => onTaskDelete(taskSelected.id, onDrawerClose);

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
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className='text-base mt-3.5 ml-auto'
        >
          {taskSelected.id === '' ? 'Adicionar' : 'Atualizar'}
        </Button>
      </form>
    </>
  );
}
