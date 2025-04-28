"use client";
import React from 'react'
import Image from "next/image";
import { cn } from '@/lib/utils';

interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
  }

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={
        cn(
"min-h-[260px] rounded-[14px] cursor-pointer w-full xl:max-w-[270px] flex flex-col justify-between  px-4 py-6 ",className)}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} width={27} height={27} alt="img" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-[16px] font-semibold text-white">{title}</h1>
        <p className="text-[14px] text-[#fff]">{description}</p>
      </div>
    </section>
  );
}

export default HomeCard