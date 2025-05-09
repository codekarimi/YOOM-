import CallList from '@/components/CallList'
import React from 'react'

const recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
    <h1 className="text-4xl font-bold">Home</h1>

    <CallList type="recordings" />
  </section>
  )
}

export default recordings