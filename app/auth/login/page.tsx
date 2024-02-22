'use client';

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import {default as Logo} from "@/public/logo.svg";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 
type FormInputs = {
  email: string;
  password: string;
}

const SigninPage = () => {
  const router = useRouter();
  const login = async () => {
    const result = await signIn(
      "credentials", {
        email: data.current.email,
        password: data.current.password,
        redirect: false
      }
    )

    if (result?.error) {
      console.log('error');
    } else {
      router.push("/dashboard");
    }
    // try{
    //   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: data.current.email,
    //       password: data.current.password
    //     }),
    //     credentials: 'include',
    //   });
    //   console.log(res)
    //   if (!res.ok) {
    //     return;
    //   } else {
    //     router.push("/dashboard");
    //   }
    //   const response = await res.json();
    //   console.log(response);
    // } catch(error) {
    //   console.log("Fetch error:", error)
    // }
  };
  const data = useRef<FormInputs>({
    email: "",
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
            </div>
            <div className="flex">
              <Button onClick={login} className="w-full rounded-xl bg-main-green text-2xl">Continue</Button>
            </div>
            <div className="flex justify-center">
              <p>Pas de compte ?</p>
              <Link href={"/auth/register"} className="text-cgreen">Inscrivez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage