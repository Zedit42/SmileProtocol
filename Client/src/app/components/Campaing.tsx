import Image from 'next/image'
import React from 'react'

const Campaing = () => {
  return (
    <div>
        <div className=" w-[45vw]  mt-8 border-8 border-black bg-[#FFF9ED] py-8 flex">
            <div className=' h-full  flex flex-col'>
                <div className='border-b-8 border-black border-dashed'>
                    <p className=' text-3xl font-extrabold m-[1rem] mb-0'>Creator Info</p>
                    <div className=' flex'>
                        <div>
                            <img
                            src={'/smile_frame.png'}
                            width={200}
                            height={200}
                            alt='frame'
                            className=' mx-4 absolute '
                            />
                            <img
                                src={'/deubc.png'}
                                width={140}
                                height={200}
                                alt='creator logo'
                                className=' m-[3rem] my-[3.5rem]  '
                            />
                        </div>
                        <div className=' max-w-[60%] mb-4'>
                            <p className=' text-xl font-bold'>BlockchainDEU</p>
                            <p>Established in 2018, Dokuz Eylül Blockchain Community has continuously evolved to define its mission, vision, and core team.</p>
                            <p>Located at Izmir</p>
                            <p>contact@blockchaindeu.com</p>
                        </div>
                    </div>
                </div>
                <div className=' w-full mt-4'>
                    <div className=' max-w-[80%] mx-auto flex flex-col'>
                        <div>
                            <img
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
                        <img
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
                        <img
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
                        <img
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
                <img
                src={'/maskot_3.png'}
                width={100}
                height={60}
                alt='table mascot'
                className='absolute -ml-1'
                />
            </div>
        </div>
    </div>
  )
}

export default Campaing