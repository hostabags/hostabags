'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormValues, signUpSchema } from '@/validations/signSchema';
import useAuth from '@/hooks/useAuth';


export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signUp(data.email, data.password);
      router.push('/');
    } catch (error) {
      console.error('Failed to create an account', error);
    }
  };

  return (
    <>
      <Header />
      <main className="container min-h-screen justify-center">
        <div className="form-container mx-auto">
          <h1>Crear tu cuenta</h1>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Dirección de correo electrónico
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none "
                placeholder="Dirección de correo electrónico"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none "
                placeholder="Contraseña"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <p className="text-gray-500 text-xs mt-1">La contraseña debe tener al menos 6 caracteres.</p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none "
                placeholder="Confirmar Contraseña"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button type="submit" className="btn w-full">
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
