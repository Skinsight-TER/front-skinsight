"use client";

import Image from "next/image";
import {default as Logo} from "@/public/logo.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Admin() {

  const router = useRouter();
  const preconsultation = async () => {
    router.push("/dashboard/preconsultation/form")
  }

  return(
    <div className="w-full h-screen bg-light-green">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex justify-center items-center">
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo picture"
          />
          <div className="text-8xl font-bold text-dark-green">SkinSight</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="my-4">En cas de crainte n'hésitez pas à faire une préconsultation</div>
          <Button onClick={preconsultation} className="bg-main-green text-lg w-72">Faites votre préconsultation</Button>
        </div>
      </div>
    </div>
  )
}