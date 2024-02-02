'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactElement, cloneElement, useEffect } from 'react';
import Toto from './components/Toto';
import AppBar from '@/components/AppBar';

const RootLayouts = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  console.log(session)


  // useEffect(() => {
  //   if (session.status === 'unauthenticated'){
  //     router.replace('/login')
  //   }

  //   if (session.status === 'authenticated') {
  //     <div>Loading...</div>
  //   }
  // }, [session, router]);


  return (
    <div>
      <AppBar />
      {children}
      <Toto />
    </div>
  )
}

export default RootLayouts