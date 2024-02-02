'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

type FormInputs = {
  email: string;
  password: string;
}

const SigninPage = () => {
  const login = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.current.email,
        password: data.current.password
      })
    })
  };
  const data = useRef<FormInputs>({
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center text-light-green bg-dark-green rounded-md shadow w-[550px] h-[500px] py-8">
        <div className="px-4 text-3xl py-6">
          Connexion
        </div>
        <div className="flex flex-col justify-between w-full h-full px-4">
          <div>
          <div className="py-2">
            <Label htmlFor="email" className="flex items-start py-2">Email :</Label>
            <Input
              type="email"
              id="email"
              placeholder="xyz@mail.com"
              required
              onChange={(e) => (data.current.email = e.target.value)}
              className="rounded-xl"
              />
          </div>
          <div className="py-2">
            <Label htmlFor="password" className="flex items-start py-2">Mot de passe :</Label>
            <Input
              type="password"
              id="password"
              required
              onChange={(e) => (data.current.password = e.target.value)}
              className="rounded-xl"
            />
          </div>
          </div>
          <div className="flex">
            <Button onClick={login} className="w-full rounded-xl bg-cgreen text-2xl">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage