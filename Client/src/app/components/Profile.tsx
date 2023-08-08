import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Profile = () => {
  return (
    <div className="max-w-[80vw] mx-auto px-4 -mt-[5rem] flex  flex-col ">
        <Image
            src={'/maskot_2.png'}
            width={150}
            height={200}
            alt='mascot'
            className=' -mb-2'
        />
        <div className=' bg-[#FFF9ED] border-8 border-black w-[80vw] min-h-[70vh] flex'>
            <div className=' flex flex-col border-r-8 gap-2 border-black border-dashed w-[20vw] min-h-[70vh] h-full'>
                <div className=' flex flex-col'>
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
                    <p className=' text-center text-2xl font-bold mt-2'>@BlockchainDEU</p>
                </div>
                <div className=' mx-auto w-[90%] text'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas sint quibusdam nostrum dolorem beatae atque minima officia commodi, fugit iste consequatur suscipit reprehenderit? Hic magnam, soluta commodi asperiores vel sequi?
                </div>
                <div className=' border-t-[5px] border-black '>
                    <p className=' text-lg font-bold text-center'>Nfts</p>
                    <div className=' grid grid-rows-2 grid-cols-4 w-[90%] justify-center mx-auto '>
                        <Image
                            src={'/nft 1.png'}
                            width={50}
                            height={40}
                            alt='nft photo'
                            className=' m-2'
                        />
                        <Image
                            src={'/nft 2.png'}
                            width={50}
                            height={40}
                            alt='nft photo'
                            className=' m-2'
                        />
                        <Image
                            src={'/nft 3.png'}
                            width={50}
                            height={40}
                            alt='nft photo'
                            className=' m-2'
                        />
                        <Image
                            src={'/nft 4.png'}
                            width={50}
                            height={40}
                            alt='nft photo'
                            className=' m-2'
                        />
                        <Image
                            src={'/nft 5.png'}
                            width={50}
                            height={40}
                            alt='nft photo'
                            className=' m-2'
                        />
                    </div>
  
                </div>
            </div>
            <div>
                <div className=' flex-col flex w-[60vw] h-[40%] '>
                    <div className=' text-2xl m-4'>
                        Contributed Projects  : )
                    </div>
                    <div className=' mt-2  gap-2 flex flex-wrap mx-4'>
                        <Link href={'/'} className=' flex flex-row  p-2 bg-[#FFEDE0]  w-[22rem] gap-4 mx-auto '>
                            <Image
                                src={'/pdessay.png'}
                                width={100}
                                height={100}
                                alt=' first project'
                                className=' min-w-[6rem] my-auto p-2 flex h-[6rem] '
                            />
                            <div className=' my-auto'>
                                <div className=' font-semibold text-lg'>
                                    Dessay
                                </div>
                                <div>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </div>
                            </div>
                            <div className=' flex flex-col -mt-2 -mr-2'>
                                <div className=' bg-[#6C7FAA] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#FDC962] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#EF7A5B] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#A2A0CF] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                            </div>
                        </Link>
                        <Link href={'/'} className=' flex flex-row p-2 bg-[#FFEDE0]  w-[22rem] gap-4 mx-auto '>
                            <Image
                                src={'/predesta.png'}
                                width={100}
                                height={100}
                                alt=' first project'
                                className=' min-w-[6rem] my-auto p-2 flex h-[6rem] '
                            />
                            <div className=' my-auto'>
                                <div className=' font-semibold text-lg'>
                                    Redesta
                                </div>
                                <div>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </div>
                            </div>
                            <div className=' flex flex-col -mt-2 -mr-2'>
                                <div className=' bg-[#6C7FAA] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#FDC962] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#EF7A5B] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#A2A0CF] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                            </div>
                        </Link>
                        <Link href={'/'} className=' flex flex-row p-2  bg-[#FFEDE0]  w-[22rem] gap-4 mx-auto '>
                            <Image
                                src={'/psmile.png'}
                                width={120}
                                height={120}
                                alt=' first project'
                                className=' min-w-[6rem] my-auto p-2 flex h-[6rem] '
                            />
                            <div className=' my-auto'>
                                <div className=' font-semibold text-lg'>
                                    Smile
                                </div>
                                <div>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                </div>
                            </div>
                            <div className=' flex flex-col -mt-2 -mr-2'>
                                <div className=' bg-[#6C7FAA] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#FDC962] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#EF7A5B] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                                <div className=' bg-[#A2A0CF] w-[2vw] h-[%20] '>
                                    &nbsp;
                                </div>
                            </div>
                        </Link>
                    </div>
                    <button className=' text-xl mr-8 mt-4 text-end'>
                        More...
                    </button>
                </div>

                <div>
                    {/* Profile Voting Layout */}
                    <div>
                        <div>
                            <div>
                                
                            </div>
                            <div>
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile