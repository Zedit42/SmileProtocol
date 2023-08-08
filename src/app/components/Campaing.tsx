import Image from 'next/image'
import React from 'react'

const Campaing = () => {
  return (
    <div>
        <div className=" w-[45vw]  mt-8 border-8 border-black bg-[#FFF9ED] py-8 flex">
            <div className=' h-full  flex flex-col'>
                <div className='border-b-8 border-black border-dashed'>
                    <p className=' text-2xl font-extrabold m-[1rem] mb-0'>Creator Info</p>
                    <div className=' flex'>
                        <div>
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
                        <div className=' max-w-[60%] mb-4'>
                            <p className=' text-lg font-bold'>BlockchainDEU</p>
                            <p>BlockchainDEU is a student community that wants to inform people about everything related to blockchain such as Metaverse, Web 3.0, Cryptocurrencies, NFT, the meaning of Decentralization and Network structures, and who want to move forward together on this journey and try to do these together as Dokuz Eylül students.</p>
                        </div>
                    </div>
                </div>
                <div className=' w-full mt-4'>
                    <div className=' max-w-[80%] mx-auto flex flex-col'>
                        <div>
                            <Image
                                src={'/nft 1.png'}
                                width={200}
                                height={200}
                                alt='nft photo'
                                className=' my-2 mx-auto'
                            />
                        </div>
                        <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic ex rerum, corporis cum, ratione vitae, debitis expedita eveniet maxime praesentium laboriosam quod eaque soluta. Incidunt quo eum distinctio alias facilis?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quaerat non aliquid enim voluptas, repellat est numquam repellendus error placeat exercitationem reiciendis excepturi assumenda veniam facilis laudantium quae cumque consectetur!
                        </div>
                        <Image
                                src={'/nft 2.png'}
                                width={200}
                                height={200}
                                alt='nft photo'
                                className=' my-2 ml-auto'
                            />
                        <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic ex rerum, corporis cum, ratione vitae, debitis expedita eveniet maxime praesentium laboriosam quod eaque soluta. Incidunt quo eum distinctio alias facilis?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quaerat non aliquid enim voluptas, repellat est numquam repellendus error placeat exercitationem reiciendis excepturi assumenda veniam facilis laudantium quae cumque consectetur!
                        </div>
                        <Image
                                src={'/nft 3.png'}
                                width={200}
                                height={200}
                                alt='nft photo'
                                className=' my-2 mr-auto'
                            />
                        <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic ex rerum, corporis cum, ratione vitae, debitis expedita eveniet maxime praesentium laboriosam quod eaque soluta. Incidunt quo eum distinctio alias facilis?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quaerat non aliquid enim voluptas, repellat est numquam repellendus error placeat exercitationem reiciendis excepturi assumenda veniam facilis laudantium quae cumque consectetur!
                        </div>
                        <Image
                                src={'/nft 4.png'}
                                width={200}
                                height={200}
                                alt='nft photo'
                                className=' my-2 mx-auto'
                            />
                        <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic ex rerum, corporis cum, ratione vitae, debitis expedita eveniet maxime praesentium laboriosam quod eaque soluta. Incidunt quo eum distinctio alias facilis?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quaerat non aliquid enim voluptas, repellat est numquam repellendus error placeat exercitationem reiciendis excepturi assumenda veniam facilis laudantium quae cumque consectetur!
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Image
                src={'/maskot_3.png'}
                width={100}
                height={60}
                alt='table mascot'
                className='absolute'
                />
            </div>
        </div>
    </div>
  )
}

export default Campaing