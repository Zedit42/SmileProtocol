import React from 'react'
import Image from 'next/image'
import Slider from './Slider'
import {CiSearch, CiFilter} from 'react-icons/ci'
import {BsArrowDown} from 'react-icons/bs'
import Feed from './Feed'

const Explore = () => {
  return (
    <div className=' flex flex-col h-full overflow-x-hidden '>
        {/* stats */}
        <div className='max-w-screen overflow-x-hidden' >
            <Image
                src={'/strip.jpg'}
                width={1920}
                height={200}
                alt={'Stripe'}
                className=' absolute w-screen max-h-[14rem] -z-10 '
            />
            <div className=' w-screen flex justify-center gap-[3rem] max-h-[14rem] mt-[2.5rem] z-20'>
                <div className=' w-[20rem] h-[9rem] border-4 flex flex-col text-center border-black bg-[#FFF9ED]'>
                </div>
                <div className=' w-[20rem] h-[9rem] border-4 flex flex-col text-center border-black bg-[#FFF9ED]'>
                    <div className=' text-4xl mt-auto'>
                        3
                    </div>
                    <div className=' text-2xl mb-auto'>
                        projects smiled
                    </div>
                </div>
                <div className=' w-[20rem] h-[9rem] border-4 flex flex-col text-center border-black bg-[#FFF9ED]'>
                    <div className=' text-4xl mt-auto'>
                        $0
                    </div>
                    <div className=' text-2xl mb-auto'>
                        towards lovely work
                    </div>
                </div>
                <div className=' w-[20rem] h-[9rem] border-4 flex flex-col text-center border-black bg-[#FFF9ED]'>
                    <div className=' text-4xl mt-auto'>
                        5
                    </div>
                    <div className=' text-2xl mb-auto'>
                        pledges
                    </div>
                </div>
                <div className=' w-[20rem] h-[9rem] border-4 flex flex-col text-center border-black bg-[#FFF9ED]'>
                </div>
            </div>
        </div>
        <div className=' flex flex-col mt-[6rem]'>
            <div className=' text-4xl ml-[10vw] mb-2 flex'>Featured Project <Image src='/token.png' width={48} height={24} alt='coin logo' className=' ml-4 '/> </div>
            <Slider/>
        </div>
        {/* Search and grid projects */}
        <div>
            <div className=' w-[80vw] mx-auto h-full mt-[3rem] gap-2 justify-between flex'>
                    <Image
                        src={'/maskot4.png'}
                        width={70}
                        height={400}
                        alt='search smiled'
                        className=' '
                    />
                <div className=' flex'>
                    <div className=' flex border-4 border-black justify-between bg-[#FFF9ED] my-auto'>
                        <input
                            type="text"
                            id="search"
                            placeholder={'Search projects that need a smile...'}
                            className=' text-black p-2 placeholder:text-gray-600  min-w-[27vw] text-xl'
                        />
                        <CiSearch className=' text-gray-600 my-auto w-[2.5rem] h-[2.5rem] pr-4  '/>
                    </div>
                </div>
                <div className=' flex'>
                    <div className='  flex border-4 border-black justify-between bg-[#FFF9ED]  my-auto '>
                        <div className=' text-gray-600 min-w-[18vw] text-xl p-2 my-auto'>Filters</div>
                        <CiFilter className=' text-gray-600 my-auto w-[2.5rem] h-[2.5rem] pr-4 '/>
                    </div>
                </div>
                <div className=' flex'>
                    <div className='  flex border-4 border-black justify-between bg-[#FFF9ED]  my-auto '>
                        <div className=' text-gray-600 min-w-[18vw] text-xl p-2 my-auto'>Order</div>
                        <BsArrowDown className=' text-gray-600 my-auto w-[2.5rem] h-[2.5rem] pr-4 '/>
                    </div>
                </div>
            </div>
            <div className=' mt-[2rem]'>
                <Feed/>
            </div>
        </div>
    </div>
  )
}

export default Explore