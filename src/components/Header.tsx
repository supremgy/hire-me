'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import InfoGrab from '../../public/infograb.svg';
import { useStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const handleClick = () => {
    if (pathname === '/survey') {
      setModalState(true);
      return;
    } else if (pathname.startsWith('/dashboard')) {
      signOut();
    }
    router.push('/');
  };
  useEffect(() => {
    if (pathname.startsWith('/dashboard')) setIsLoading(false);
  }, [pathname, setIsLoading]);
  return (
    <header className='w-full h-10 flex justify-center mt-4'>
      <Image src={InfoGrab} alt='InfoGrab' height={30} onClick={handleClick} />
    </header>
  );
}
