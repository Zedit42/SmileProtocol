import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <main className=' cursor-none '>
    <img
      src='/backgroundimage.webp'
      className=' w-full h-full fixed -z-10'
      alt='bg image'
    />
    <div className='custom-default w-screen h-screen flex justify-center my-auto'>
        <Image
            src={'/maskot.png'}
            width={700}
            height={200}
            className=' pt-[20rem] opacity-50 animate-jellyinfinite'
            alt=' more cute logo'
        />
        <div className=' text-4xl my-auto '>Loading</div>
    </div>
  </main>
  )
}

export default loading