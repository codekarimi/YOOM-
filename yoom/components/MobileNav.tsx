"use client";
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
    
    const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px] text-white">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Navigation"
            width={30}
            height={30}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href={"/"} className="flex items-centre gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Yoom logo"
              width={30}
              height={30}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                 {sidebarLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`${item.route}/`); //if we on current page

              return (

                <SheetClose asChild key={item.route}>  

                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                    {
                      "bg-blue-1": isActive,
                    }
                  )}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <p className="text-lg font-semibold  text-white">
                    {item.label}
                  </p>
                </Link>

                </SheetClose>
              
              );
            })}
            </section>
            </SheetClose>
           


          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav