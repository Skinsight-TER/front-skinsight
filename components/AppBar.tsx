import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'

const AppBar = () => {
  return (
    <header className='flex flex-col justify-start w-[20%] h-full gap-4 p-4 bg-dark-green shadow'>
      <Link href={"/"} className='transition-colors hover:bg-main-green hover:text-white'>
        Accueil
      </Link>
      <Link href={"/preconsultation"} className='transition-colors hover:bg-main-green hover:text-white'>
        Préconsultation
      </Link>
      <Link href={"/rdv"} className='transition-colors hover:bg-main-green hover:text-white'>
        Mes Rendez-vous
      </Link>
      <Link href={"/drive"} className='transition-colors hover:bg-main-green hover:text-white'>
        Drive
      </Link>

      <SignInButton/>
    </header>
  )
}

export default AppBar