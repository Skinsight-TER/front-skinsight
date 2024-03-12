"use client";
// import { Button } from "@/components/Button";
import { Button } from "@/components/Button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.current.email,
        firstName: data.current.firstName,
        lastName: data.current.lastName,
        gender: data.current.gender,
        age: data.current.age,
        password: data.current.password,
      }),
      credentials: 'include',
    });

    const user = await res.json();
    if (!res.ok) {
      alert(res.statusText);
      return;
    } else {
      return { email: user.email, name: user.name }
    }   
  };

  const data = useRef<FormInputs>({
    email: "",
    firstName: "",
    lastName: "",
    gender: Gender.MALE,
    age: 0,
    password: "",
  });
  return (
    <div className="flex flex-col items-center">
      <Image
        src={Logo}
        width={150}
        height={150}
        alt="Logo picture"
      />
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center text-light-green bg-dark-green rounded-md shadow w-[550px] h-[600px] py-8">
          <div className="px-4 text-3xl py-6">
            Inscription
          </div>
          <div className="flex flex-col justify-between w-full h-full px-4">
            <div className="flex gap-2 py-2">
              <div className="w-full">
                <Label htmlFor="firstName">Prénom :</Label>
                <Input
                  name="firstName"
                  required
                  onChange={(e) => (data.current.firstName = e.target.value)}
                  className="rounded-xl text-main-dark"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="lastName">Nom :</Label>
                <Input
                  name="lastName"
                  required
                  onChange={(e) => (data.current.lastName = e.target.value)}
                  className="rounded-xl text-main-dark"
                />
              </div>
            </div>
            <div className="py-2">
              <Label htmlFor="email" className="flex items-start py-2">Email :</Label>
              <Input
                type="email"
                id="email"
                placeholder="xyz@mail.com"
                required
                onChange={(e) => (data.current.email = e.target.value)}
                className="rounded-xl text-main-dark"
                />
            </div>
            <div className="py-2">
              <Label htmlFor="password" className="flex items-start py-2">Mot de passe :</Label>
              <Input
                type="password"
                id="password"
                required
                onChange={(e) => (data.current.password = e.target.value)}
                className="rounded-xl text-main-dark"
              />
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-full">
                <Label htmlFor="age" className="flex items-start py-2">Age :</Label>
                <Input
                  name="age"
                  type="number"
                  required
                  onChange={(e) => (data.current.age = Number(e.target.value))}
                  className="rounded-xl text-main-dark"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="gender" className="flex items-start py-2">Genre :</Label>
                <Select onValueChange={(value: Gender) => (data.current.gender = value)}>
                  <SelectTrigger className="rounded-xl text-main-dark">
                    <SelectValue placeholder="Quel est votre genre ?"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.MALE} className="text-main-dark">Male</SelectItem>
                    <SelectItem value={Gender.FEMALE} className="text-main-dark">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex">
              <Button onClick={register} className="w-full rounded-xl bg-cgreen text-2xl">Continue</Button>
            </div>
            <div className="flex justify-center">
              <p>Déjà un compte ?</p>
              <Link href={"/auth/login"} className="text-cgreen">Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;