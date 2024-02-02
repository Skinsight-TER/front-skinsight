import { useRef } from "react";

type FormInputs = {
  email: string;
  password: string;
}

const SinginPAge = () => {
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
    <div className="flex justify-center items-center bg">
      <div>
        Connexion
      </div>
    </div>
  )
}