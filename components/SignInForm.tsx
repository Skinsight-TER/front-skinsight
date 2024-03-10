"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';

const schema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(6, { message: 'Password is required' })
})

type SignInFormParameters = z.infer<typeof schema>

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm<SignInFormParameters>({ mode: "onSubmit", resolver: zodResolver(schema) });

  const onSubmit = async (data: SignInFormParameters) => {
    setLoading(true);
    const result = await signIn(
      "credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })


    if (result?.error) {
      setError(result?.error);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col dark:bg-dark-strong">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)(e);
          }}>
            {!!error && <p className='text-red-600 text-sm mb-2'>Invalid email or password</p>}
            <FormControl aria-invalid={errors.email ? true : false}>
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input type='email' {...register("email")} disabled={isLoading} placeholder='Type your email...' className='dark:bg-inherit' />
              {errors?.email?.message && <FormMessage>{errors.email?.message?.toString()}</FormMessage>}
            </FormControl>
            <FormControl aria-invalid={errors.password ? true : false}>
              <FormLabel>Password</FormLabel>
              <Input type='password' {...register("password")} disabled={isLoading} placeholder='Type your password...' />
              {errors?.password?.message && <FormMessage>{errors.password?.message?.toString()}</FormMessage>}
            </FormControl>
            <Button variant="destructive" type='submit' disabled={isLoading}>Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInForm;