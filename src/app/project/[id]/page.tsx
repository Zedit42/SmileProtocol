import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'

import React from 'react'

const Project = () => {
  return (
    <main>
      <img
        src='/backgroundimage.png'
        className=' w-full h-full fixed -z-10'
        alt='bg image'
      />
      <div className=' z-20 '>
        <Header/>
        <Hero/>
      </div>
    </main>
  )
}

export default Project