"use client"
import React from 'react';
import Button from './Button';
import { MdVerified } from 'react-icons/md'
import Image from 'next/image';
import Campaing from './Campaing';

const Hero = () => {
  return (
    <div className="max-w-[75vw] mx-auto px-4 my-6 flex gap-[4rem] ">
      <div className=' '>
        <div className=" w-[45vw] border-2 border-black">
          <Image
          src={'/boxbg.png'}
          width={1920}
          height={1080}
          alt='project image'
          className=' object-cover'
          />
        </div>

        <div className="flex flex-wrap justify-start gap-3 mt-8 ">
            <Button text="Campaign" onClick={() => console.log('clicked!')} />
            <Button text="Roadmap" onClick={() => console.log('clicked!')} />
            <Button text="Updates" onClick={() => console.log('clicked!')} />
            <Button text="Supporters" onClick={() => console.log('clicked!')} />
            <Button text="Comments" onClick={() => console.log('clicked!')} />
        </div>

        <Campaing/>
      </div>

      <div className=" left-3 top-32 min-h-[70vh] h-full w-[22vw] pb-12 p-5 bg-[#FFF9ED] border-8 border-black text-center">

        <h1 className=' font-extrabold text-3xl'>Turkey and Syria Earthquake</h1>
        <div className='flex flex-row justify-center items-center gap-1'><MdVerified size={20} className='text-[#7fe0c5]' /><h4 className=''>Verified Project</h4></div>

        <h1 className='mt-10 font-bold text-2xl'>158,788 / 235,000 $</h1>
        <div>
          <div className=' text-xl animate-pulse font-bold flex flex-row mt-[1rem] '> 
            <p>Processing</p>
            <p className=' text-2xl ml-2'>. . .</p>
          </div>
          <div className=' border-black border-[0.3rem] w-full '>
            <div className=' my-[0.5rem] w-full flex gap-2 items-center justify-center flex-wrap'>
              <div className=' bg-[#8fb3ff] p-[0.8rem]  '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.8rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.8rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.8rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.8rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.8rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.8rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.8rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.8rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.8rem] '>
              </div>
            </div>
          </div>
        </div>


        <div className='flex justify-between mx-2 py-8'>
            <div>
                <h1 className=' font-bold text-3xl'>28</h1>
                <p className='font-bold'>days to go</p>
            </div>
            <div>
                <h1 className=' font-bold text-3xl'>5,699</h1>
                <p className='font-bold'>supporter</p>
            </div>
        </div>
        <button className=' w-5/6 h-16 mt-[3rem] border-4 border-black bg-black text-[#FFF9ED] duration-200 ease-linear hover:bg-[#FFF9ED] hover:text-black text-4xl font-bold py-2'>Support</button>
      </div>
    </div>
  );
};

export default Hero;
