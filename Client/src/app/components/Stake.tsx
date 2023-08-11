"use client"
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';

const Stake = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [inputValue, setInputValue] = useState<number | ''>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value !== '' ? parseFloat(event.target.value) : '';
    setInputValue(newValue);
  };


  const tabContent = [
    () => 
            <div className=' w-[90%] mx-auto h-[70vh] flex flex-col pt-[8rem] '>
                <div className=' flex flex-col gap-20'>
                    <div className=' flex border-4 border-dashed border-black justify-between'>
                        <input
                            type="number"
                            id="number"
                            placeholder={'0'}
                            className=' p-2 text-black placeholder:text-black bg-[#FFF9ED] !h-[3rem] w-full text-xl'
                            value={inputValue === '' ? '' : inputValue}
                            onChange={handleInputChange}
                        />
                        <Image
                            src={'/chainlink.png'}
                            width={44}
                            height={24}
                            alt='ccip token'
                            className=' p-1'
                        />
                    </div>

                    {/* arrow */}

                    <div className=' flex border-4 border-dashed border-black justify-between'>
                        <input
                            type="number"
                            id="number"
                            placeholder={'0'}
                            className=' p-2 text-black placeholder:text-black bg-[#FFF9ED] !h-[3rem] w-full text-xl'
                            value={inputValue === '' ? '' : inputValue}
                            onChange={handleInputChange}
                        />
                        <Image
                            src={'/token.png'}
                            width={44}
                            height={24}
                            alt='ccip token'
                            className=' p-1'
                        />
                    </div>
                </div>
                <div className=' mt-[4rem] flex justify-between'>
                    <button className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'>Approve</button>
                    <button className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'>Stake</button>
                </div>

            </div>,
    () =>             
            <div className=' w-[90%] mx-auto h-[70vh] flex flex-col pt-[8rem] '>
                <div className=' flex flex-col gap-20'>
                    <div className=' flex w-full '>
                        <div className=' text-3xl text-center w-full '>You earned this for smiled with your donations </div>
                    </div>
                    <div className=' flex items-center justify-center text-2xl gap-2'>
                        <div>0</div>
                        <div>SMILE</div>
                        <Image
                            src={'/token.png'}
                            width={44}
                            height={24}
                            alt='ccip token'
                            className=' p-1'
                        />
                    </div>
                </div>
                <div className=' mt-[4rem] flex justify-center'>
                    <button className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'>Claim</button>
                </div>
            </div>,
  ];

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col mx-auto w-[33vw] max-md:w-[90vw]">
      <div className=" ">
        <div className=" justify-between w-full flex">
          <div
            className={`cursor-pointer ${
              activeTab === 1 ? ' bg-black text-[#FFF9ED] border-b-0 duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer w-[16vw] max-md:w-[40vw] text-center text-xl' : 'bg-[#FFF9ED] border-b-0 max-md:w-[40vw] text-black w-[16vw] text-center hover:bg-black hover:text-[#FFF9ED]  duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl'
            }`}
            onClick={() => handleTabChange(1)}
          >
            Stake
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === 2 ? 'bg-black text-[#FFF9ED] duration-200 ease-linear border-4 border-black font-bold py-2 px-4 w-[16vw] border-b-0 text-center custom-pointer max-md:w-[40vw] text-xl' : 'bg-[#FFF9ED] border-b-0 w-[16vw] text-center max-md:w-[40vw] text-black hover:bg-black hover:text-[#FFF9ED]  duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl'
            }`}
            onClick={() => handleTabChange(2)}
          >
            Reward
          </div>
        </div>
      </div>
      <div className="">
        <div className="border-4 border-black bg-[#FFF9ED] min-h-[70vh]">
          {tabContent[activeTab - 1]()}
        <Image
            src={'/nft 2.png'}
            width={64}
            height={64}
            alt='cute logo'
            className='-mt-[3rem] -ml-[1rem] rotate-45 absolute'
        />
        </div>
        <Image
        src={'/maskot.png'}
        width={700}
        height={200}
        className=' absolute mt-[4rem]'
        alt=' more cute logo'
      />
      </div>


    </div>
  );
};

export default Stake;
