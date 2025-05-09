import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

// import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className='relative'>

        <Navbar></Navbar>

        <div className="flex">

        <Sidebar></Sidebar>

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">

                <div className="w-full">
                {children}
                </div>
            </section>
        </div>
       
    
    </main>
  );
};

export default RootLayout;