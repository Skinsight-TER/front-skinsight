'use client';

import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import { CiLogout, CiSettings } from "react-icons/ci";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const SignInButton = () => {
  const { data: session, status } = useSession();

  // Si l'utilisateur est authentifié, afficher les informations de l'utilisateur et le bouton de déconnexion
  if (status === "authenticated") {
    return (
      <div className="flex justify-center bg-red-400 mx-4 my-2 rounded-lg">
        <button onClick={() => signOut()} className="text-white">Sign Out</button>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, afficher les liens de connexion et d'inscription
  return (
    <div className="flex gap-6 my-5">
      <Link href={"/auth/login"} className="bg-light-green2 px-4 py-2 rounded-lg text-green-800">
        Connectez-vous
      </Link>
      <Link href={"/auth/register"} className="bg-main-green text-green-50 px-4 py-2 rounded">
        Register
      </Link>
    </div>
  );
};

export default SignInButton;


// const SignInButton = () => {
//   const { data: session, status } = useSession();

//   if (status === "authenticated") {
//     <p>Signed as {session.user?.email}</p>
//     // return (
//     //   <div className="flex gap-4 ml-auto">
//     //     <p className="text-sky-600">{session.user.name}</p>
//     //     <Link 
//     //       href={"/auth/logout"}
//     //       className="flex gap-4 ml-auto text-red-600"
//     //     >
//     //       Sign Out
//     //     </Link>
//     //   </div>
//     // );
//   }

//   return (
//     <div className="flex gap-4 ml-auto items-center">
//       <Link href={"/auth/login"} className="flex gap-4 ml-auto text-green-600">
//         Login
//       </Link>
//       <Link href={"/auth/register"} className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded">
//         Register
//       </Link>
//     </div>
//   )
// };

// export default SignInButton;

// // rightIcon={<BiChevronDown className='dark:text-white' />} 