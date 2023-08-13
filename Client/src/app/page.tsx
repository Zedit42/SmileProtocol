"use client"
import Header from '@/app/components/Header'
import Hero from '@/app/components/Explore'
import Head from "next/head";
import {useEffect} from "react";
export default function Home() {
  useEffect(() => {
    document.title = "Smile Protocol"
  }, []);
  return (
    <>

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
    </>
  )
}
