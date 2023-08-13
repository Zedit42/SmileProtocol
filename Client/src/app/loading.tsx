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
    <div className='custom-default w-screen h-screen flex justify-center'>
        <img
            src={'/maskot.png'}
            width={700}
            height={200}
            className='opacity-50 w-[50vw] max-h-[70vh] my-auto  animate-jellyinfinite'
            alt=' more cute logo'
        />
    </div>
  </main>
  )
}

export default loading