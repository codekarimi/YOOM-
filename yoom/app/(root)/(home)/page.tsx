import React from 'react'

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-4xl font-bold">Home</h1>

      <section className="flex size-full flex-col gap-10 text-white">
        <div className="w-full rounded-[20px] bg-hero bg-cover h-[300px]">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:px-5 lg:p-11">
            <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">Upcoming Meeting at 10:00 AM</h2>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home