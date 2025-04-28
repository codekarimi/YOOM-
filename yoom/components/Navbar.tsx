import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import MobileNav from '@/components/MobileNav';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full-bg-dark-1 px-6 py-4 lg:px-10 gap-5 ">
      <Link href={"/"} className="flex items-centre gap-1">
        <Image
          src="/icons/logo.svg"
          alt="Yoom logo"
          width={30}
          height={30}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white  max-sm:hidden">Yoom</p>
      </Link>


      <div className="flex-between gap-5">

            <SignedIn>
                    <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>

        <MobileNav/>
      </div>
    </nav>
  );
}

export default navbar