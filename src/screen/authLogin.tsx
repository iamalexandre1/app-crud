import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import InputField from '../components/input';
import Button from '../components/button';

// Simulation of API response time
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Schema
const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Muito curto. Deve ter no mínimo 6 caracteres')
    .max(12, 'Muito longo. Deve ter no máximo 12 caracteres')
    .required('Campo obrigatório'),
});

export default function AuthLogin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const loginProcess = async () => {
        await sleep(3000); // Server request simulation

        console.log(values);
        return 'Conectado com sucesso';
      };

      toast.promise(loginProcess(), {
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
        type='email'
        label='Email'
        erroMessage={handlerGetFieldErros('email')}
        {...formik.getFieldProps('email')}
      />

      <InputField
        type='password'
        label='Password'
        className='my-2'
        erroMessage={handlerGetFieldErros('password')}
        {...formik.getFieldProps('password')}
      />

      <Button type='submit' className='self-end' disabled={formik.isSubmitting}>
        Continuar
      </Button>

      <Toaster position='top-center' />
    </form>
  );
}
