"use client";
// import { Button } from "@/components/Button";
import { Button } from "@/components/Button"
import InputBox from "@/components/InputBox";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import React, { useRef } from "react";

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
    try{
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.current.email,
          firstName: data.current.firstName,
          lastName: data.current.lastName,
          gender: data.current.gender,
          age: data.current.age,
          password: data.current.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        alert(res.statusText);
        return;
      }
      const response = await res.json();
      alert("User Registered!");
      console.log({ response });
    }catch(error){
      console.error("Fetch error: ", error);
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
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <div className="flex gap-6">
          <InputBox
            name="firstName"
            labelText="Prénom"
            required
            onChange={(e) => (data.current.firstName = e.target.value)}
          />
          <InputBox
            name="lastName"
            labelText="Nom"
            required
            onChange={(e) => (data.current.lastName = e.target.value)}
          />
        </div>
        <Select onValueChange={(value: Gender) => (data.current.gender = value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select your Gender"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Gender.MALE}>Male</SelectItem>
            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
          </SelectContent>
        </Select>
        {/* <Input
          name="gender"
          required
          onChange={(e) => (data.current.gender = e.target.value)}
        /> */}
        <Input
          name="age"
          type="number"
          required
          onChange={(e) => (data.current.age = Number(e.target.value))}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;