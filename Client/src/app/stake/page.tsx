import Header from '@/app/components/Header'
import Hero from '@/app/components/Stake'

import React from 'react'

const Stake = () => {
  return (
    <main className=' cursor-none '>
      <img
        src='/backgroundimage.webp'
        className=' w-full h-full fixed -z-10'
        alt='bg image'
      />
      <div className='custom-default'>
        <Header/>
        <Hero/>
      </div>
    </main>
  )
}

export default Stake