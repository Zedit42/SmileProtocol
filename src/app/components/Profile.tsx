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
                <div className='   mt-2 w-[60vw] h-[40%]'>
                    <Link href={'/'} className=' flex flex-row shadow-lg p-4 w-[90%] gap-4 mx-auto '>
                        <Image
                            src={'/nft 1.png'}
                            width={40}
                            height={30}
                            alt=' first project'
                            className=' w-[6%] '
                        />
                        <div>
                            <div className=' font-semibold text-lg'>
                                Title
                            </div>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            </div>
                        </div>
                    </Link>
                    <Link href={'/'} className=' flex flex-row shadow-lg p-4 w-[90%] gap-4 mx-auto '>
                        <Image
                            src={'/nft 2.png'}
                            width={50}
                            height={50}
                            alt=' first project'
                            className=' w-[6%] '
                        />
                        <div>
                            <div className=' font-semibold text-lg'>
                                Title
                            </div>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            </div>
                        </div>
                    </Link>
                    <Link href={'/'} className=' flex flex-row shadow-lg p-4 w-[90%] gap-4 mx-auto '>
                        <Image
                            src={'/nft 3.png'}
                            width={50}
                            height={50}
                            alt=' first project'
                            className=' w-[6%] '
                        />
                        <div>
                            <div className=' font-semibold text-lg'>
                                Title
                            </div>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur adipisicing Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
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