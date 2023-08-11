"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {AiOutlinePlus, AiOutlineHeart} from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'

interface Slide {
    id: number;
    src: string;
    title: string;
    href: string;
  }
  
  const slide: Slide[] = [
    { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1',  },
    { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1',  },
    { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1',  },
  ];
export default function Slider(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slide.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slide.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 7000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-[80vw] h-[60vh]  mx-auto  bg-[#FFF9ED] ">
      {slide.map((slide, index) => (
        <Link
          href={slide.href}
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000  ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
        <div className=' flex h-full w-full'>
            <img
                className=" h-full w-full flex max-w-[65%] object-cover "
                src={slide.src}
                alt={`Slider image ${index + 1}`}
            />
            <div className=' mx-auto flex flex-col my-auto py-4'>
                <div className=' text-5xl'>{slide.title}</div>
                <div className=' text-3xl text-center'>By BlockchainDEU</div>
                <div className=' justify-center flex mt-8'>
                        <Image
                            src={'/smile_frame.png'}
                            width={200}
                            height={200}
                            alt='frame'
                            className=' mx-4 absolute '
                        />
                        <Image
                            src={'/DeuBc.png'}
                            width={140}
                            height={200}
                            alt='creator logo'
                            className=' m-[3rem] my-[3.5rem]  '
                        />
                    </div>
                <button className=' bg-[#FFF9ED] text-black mt-[2vh] z-10 hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'>Support</button>
                <div className=' flex justify-between  pt-[2vh] text-[#E86A6B]'>
                    <AiOutlineHeart className=' w-[2.5rem] h-[2.5rem]'/>
                    <BsBookmark className=' w-[2.5rem] h-[2.5rem]'/>
                    <AiOutlinePlus className=' w-[2.5rem] h-[2.5rem]'/>
                </div>

            </div>
        </div>

        </Link>
      ))}
    <button
        className="absolute top-1/2 -left-[6vw] transform -translate-y-1/2"
        onClick={goToPrevSlide}
      >
        <Image
        src={'/arrow.png'}
        width={70}
        height={240}
        alt='left arrow'
        className=' rotate-180'
        />
      </button>
      <button
        className="absolute top-1/2 -right-[6vw] transform -translate-y-1/2 "
        onClick={goToNextSlide}
      >
        <Image
        src={'/arrow.png'}
        width={70}
        height={240}
        alt='left arrow'
        className=''
        />
      </button>
    </div>
  );
}
