import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import AppBar from "@/components/AppBar";
import {default as Logo} from "@/public/logo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen bg-light-green">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center">
          <div>
            <Image
              src={Logo}
              width={150}
              height={150}
              alt="Logo picture"
            />
          </div>
          <div className="text-8xl font-bold text-dark-green">Bienvenue sur SkinSight</div>
        </div>
        <div>
          <AppBar />
        </div>
      </div>
    </div>
  )
}