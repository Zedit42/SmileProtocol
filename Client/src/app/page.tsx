import Header from '@/app/components/Header'
import Hero from '@/app/components/Explore'
import Head from 'next/head'
export default function Home() {
  return (
    <>
    <Head>
      
    <title>Smile Protocol</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    </Head>
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
