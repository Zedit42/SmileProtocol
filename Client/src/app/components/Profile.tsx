"use client"
import React,  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {EASSCAN_URL, SchemaType} from "../../../constants"
import {makeAttestation} from "../../../eas";
import toast, { Toaster } from 'react-hot-toast';
interface ProfileProps {
    encodedData:{
        data:string,
        value:{
            value:string
        }
    }[];
    attestationData:string[]
}



const Profile:React.FC<ProfileProps> = ({encodedData,attestationData}) => {

    const createAttestation = async(answer) => {
        try {
            const toastId = toast.loading("Your vote saving to EAS")
            let [res] = await Promise.all([makeAttestation(SchemaType.Vote, window.ethereum,answer)])
            toast.success("Your vote saved at EAS successfully!",{
                id:toastId
            })
        }catch(error) {
            toast.error("Error")
        }

    }


    const renderData = (data, attestationData) => {
        return data?.slice(0).reverse().map((item, index:number) => {
            const isApproved = item[2].value?.value === true;
            const statusColor = isApproved ? '#65b550' : '#b55052';
            const statusMessage = isApproved ? 'approved' : 'rejected';
            const imageUrl = parseInt(item[0]?.value?.value) === 1 ? '/psmile.png' : '/pdessay.png';
            const emoji = isApproved ? '✅':'❌'
            return (
                <div key={index} className='flex flex-row gap-2 items-center mx-4'>
                    <Image src={imageUrl} width={50} height={50} alt={isApproved ? 'psmile' : 'pdessay'}/>
                    <Link href={`${EASSCAN_URL}${attestationData[index]}`}>
                        <h1 className={`text-[${statusColor}] text-xl`}>
                            $20 {statusMessage} for Dessay{emoji}
                        </h1>
                    </Link>
                </div>
            );
        });
    };

    return <div className="max-w-[80vw] mx-auto px-4 -mt-[5rem] flex  flex-col ">
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
            Established in 2018, Dokuz Eylül Blockchain Community has continuously evolved to define its mission, vision, and core team.
            <br/>Located at Izmir
            <br/>contact@blockchaindeu.com
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
                    <Link href={'/project/1'} className=' flex flex-row p-2  bg-[#FFEDE0]  w-[18rem] gap-4 mx-auto custom-pointer'>
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
                            <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer'
                            onClick={()=>
                                createAttestation(true)
                            }/>
                            <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer'
                            onClick={()=>
                                createAttestation(false)
                            }
                            />
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
                {/*Buraya EASTAN VERİLER GELECEK*/}
                <div className='flex flex-col gap-2 p-3 overflow-auto w-[50%] h-[40vh] border-black border-dashed border-l-8'>
                    {
                        renderData(encodedData,attestationData)
                    }
                <Toaster/>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Profile