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
        <div className=' bg-[#FFF9ED] border-8 border-black w-[80vw] min-h-[70vh] flex mb-10'>
            <div className=' flex flex-col border-r-8 gap-2 border-black border-dashed w-[20vw] min-h-[70vh]'>
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
                <div className=' border-t-8 border-black border-dashed '>
                    <p className=' text-lg font-bold text-center'>N F T s</p>
                    <div className=' grid grid-rows-2 grid-cols-4 w-[90%] justify-center items-end mx-auto '>
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
                <div className=' flex-col flex w-[60vw] mb-5'>
                    <div className=' text-2xl m-4'>
                        Smiled Projects  
                    </div>
                    <div className=' mt-2  gap-2 flex flex-wrap mx-4'>
                        <Link href={'/'} className=' flex flex-row  p-2 bg-[#FFEDE0]  w-[18rem] gap-4 mx-auto custom-pointer'>
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
                        <Link href={'/'} className=' flex flex-row p-2 bg-[#FFEDE0]  w-[18rem] gap-4 mx-auto custom-pointer'>
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
                        <Link href={'/'} className=' flex flex-row p-2  bg-[#FFEDE0]  w-[18rem] gap-4 mx-auto custom-pointer'>
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
                <div className=' flex flex-row border-t-8 border-black border-dashed'>
                    <div className='flex flex-col gap-4 p-3 w-[50%] h-[40vh] overflow-auto'>
                        <div className=' flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-2'>   
                                <Image src="/pdessay.png" width={70} height={70} alt='pdessay' />
                                <div className='flex flex-col text-sm'>
                                    <h1 className='text-xl'>Dessay asks for $20</h1>
                                    <p className=' animate-pulse'>last 2 days...</p>
                                </div>
                            </div>
                            <div className=' flex flex-row justify-end'>
                                <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer'/>
                                <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer'/>
                            </div>
                        </div>
                        <div className=' flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-2'>   
                                <Image src="/predesta.png" width={70} height={70} alt='pdessay' />
                                <div className='flex flex-col text-sm'>
                                    <h1 className='text-xl'>Redesta asks for $20</h1>
                                    <p className=' animate-pulse'>last 2 days...</p>
                                </div>
                            </div>
                            <div className=' flex flex-row justify-end'>
                                <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer'/>
                                <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer'/>
                            </div>
                        </div>
                        <div className=' flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-2'>   
                                <Image src="/psmile.png" width={70} height={70} alt='pdessay' />
                                <div className='flex flex-col text-sm'>
                                    <h1 className='text-xl'>Smile asks for $20</h1>
                                    <p className=' animate-pulse'>last 2 days...</p>
                                </div>
                            </div>
                            <div className=' flex flex-row justify-end'>
                                <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer'/>
                                <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer'/>
                            </div>
                        </div>
                        <div className=' flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-2'>   
                                <Image src="/pdessay.png" width={70} height={70} alt='pdessay' />
                                <div className='flex flex-col text-sm'>
                                    <h1 className='text-xl'>Dessay asks for $20</h1>
                                    <p className=' animate-pulse'>last 2 days...</p>
                                </div>
                            </div>
                            <div className=' flex flex-row justify-end'>
                                <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer'/>
                                <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer'/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 p-3 overflow-auto w-[50%] h-[40vh] border-black border-dashed border-l-8'>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/pdessay.png" width={50} height={50} alt='pdessay' />
                            <h1 className=' text-[#65b550] text-xl'>$20 approved for Dessay ✅</h1>
                        </div>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/psmile.png" width={50} height={50} alt='psmile' />
                            <h1 className=' text-[#b55052] text-xl'>$20 refused for Smile ❌</h1>
                        </div>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/pdessay.png" width={50} height={50} alt='pdessay' />
                            <h1 className=' text-[#65b550] text-xl'>$20 approved for Dessay ✅</h1>
                        </div>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/psmile.png" width={50} height={50} alt='psmile' />
                            <h1 className=' text-[#b55052] text-xl'>$20 refused for Smile ❌</h1>
                        </div>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/pdessay.png" width={50} height={50} alt='pdessay' />
                            <h1 className=' text-[#65b550] text-xl'>$20 approved for Dessay ✅</h1>
                        </div>
                        <div className=' flex flex-row gap-2 items-center mx-4'>
                            <Image src="/psmile.png" width={50} height={50} alt='psmile' />
                            <h1 className=' text-[#b55052] text-xl'>$20 refused for Smile ❌</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile