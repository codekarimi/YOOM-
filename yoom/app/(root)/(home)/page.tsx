import MeetingType from '@/components/MeetingType';
import React from 'react'



const Home = () => {

  const currentDate = new Date().toLocaleDateString([], {
    weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
  });
  const time = new Date().toLocaleTimeString('en-US',{
    timeZone: 'Africa/Nairobi',
    hour: '2-digit',
    minute: '2-digit'
  });

  
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-4xl font-bold">Home</h1>

      <section className="flex size-full flex-col gap-10 text-white">
        <div className="w-full rounded-[20px] bg-hero bg-cover h-[300px]">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:px-5 lg:p-11">
            <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at 10:00 AM
            </h2>

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">
                {time}
              </h1>
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">{currentDate}</p>
            </div>
          </div>
        </div>


        <MeetingType/>
      </section>
    </section>
  );
}

export default Home
