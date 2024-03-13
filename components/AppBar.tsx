'use client'

import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


export default function AppBar() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className='flex flex-col bg-dark-green w-[20%] h-screen gap-5 px-6'>
        <Avatar className='my-5'>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link href={"/dashboard"} className='text-lg mb-[-18px] hover:underline-offset-2'>Accueil</Link>
        <Accordion type='single' collapsible>
          <AccordionItem value='preconsultation' className='text-lg border-none'>
            <AccordionTrigger>Préconsultation</AccordionTrigger>
            <AccordionContent>
              <Link href={"/dashboard/preconsultation/form"}>Formulaire de préconsultation</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href={"/dashboard/preconsultation/in-progress"}>Préconsultation en cours</Link>
            </AccordionContent>
          </AccordionItem>
          <Link href={"/dashboard/rdv/in-progress"} className='text-lg mt-[18px]'>Mes Rendez-vous</Link>
          <AccordionItem value='drive' className='text-lg border-none'>
            <AccordionTrigger>Drive</AccordionTrigger>
            <AccordionContent>
              <Link href={"/dashboard/drive/import"}>importez vos images</Link>
            </AccordionContent>
            <AccordionContent>
              <Link href={"/dashboard/drive/storage"}>Vos images</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='mb-10 mt-auto'>
          <SignInButton />
        </div>
      </div>
    )
  }
  return (
    <SignInButton />
  )
}