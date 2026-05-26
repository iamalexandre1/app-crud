import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import InputField from '../components/input';
import Button from '../components/button';

// Simulation of API response time
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Schema
const validationSchema = Yup.object({
  username: Yup.string()
    .max(20, 'Muito longo. Deve ter no máximo 20 caracteres')
    .required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Muito curto. Deve ter no mínimo 6 caracteres')
    .max(12, 'Muito longo. Deve ter no máximo 12 caracteres')
    .required('Campo obrigatório'),
});

export default function AuthRegister() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const registerProcess = async () => {
        await sleep(3000); // Server request simulation

        console.log(values);
        return 'Cadastrado com sucesso';
      };

      toast.promise(registerProcess(), {
        loading: 'Enviando dados...',
        success: (data) => {
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);

          return `${data}`;
        },
        error: (err) => `${err.message || 'Algo deu errado'}`,
      });
    },
  });

  // Actions
  const handlerGetFieldErros = (
    fieldName: keyof typeof formik.initialValues,
  ) => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? formik.errors[fieldName]
      : undefined;
  };

  return (
    <form className='flex flex-col pt-4 w-60' onSubmit={formik.handleSubmit}>
      <InputField
        label='Username'
        erroMessage={handlerGetFieldErros('username')}
        {...formik.getFieldProps('username')}
      />

      <InputField
        type='email'
        label='Email'
        className='my-2'
        erroMessage={handlerGetFieldErros('email')}
        {...formik.getFieldProps('email')}
      />

      <InputField
        type='password'
        label='Password'
        className='mb-2'
        erroMessage={handlerGetFieldErros('password')}
        {...formik.getFieldProps('password')}
      />

      <Button type='submit' className='self-end'>
        Continuar
      </Button>

      <Toaster />
    </form>
  );
}
