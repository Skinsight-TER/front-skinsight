'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactElement, cloneElement, useEffect } from 'react';
import AppBar from '@/components/AppBar';

const RootLayouts = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  console.log(session)


  useEffect(() => {
    if (session.status === "loading") return
    if (session.status === 'unauthenticated'){
      router.replace('/auth/login')
    }

    // if (session.status === 'authenticated') {
    //   <div>Loading...</div>
    // }
  }, [session, router]);

  return (
    <div className='flex gap-2'>
      <AppBar />
      {children}
    </div>
  )
}

export default RootLayouts