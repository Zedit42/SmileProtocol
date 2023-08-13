"use client"
import React,{useEffect, useState}from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {EASSCAN_URL, SchemaType} from "../../../constants"
import {getDatasFromGraphQL} from "../../../constants/global";
import {makeAttestation,getStringFromHexString} from "../../../eas";
import {ApolloQueryResult} from "@apollo/client";
import {SchemaDecodedItem} from "@ethereum-attestation-service/eas-sdk";
import toast, { Toaster } from 'react-hot-toast';
import { useContractWrite, useAccount } from 'wagmi'
import { MAIN_CONTRACT} from '../../../config'
import {encodeBytes32String} from "ethers"
import {parseEther, stringToHex} from "viem"
/* interface ProfileProps {
    encodedData:{
        data:string,
        value:{
            value:string
        }
    }[];
    attestationData:string[]
} */

interface AttesterData {
    id:string,
    data:string,
}



const Profile  = () => {
    const [cleanData,setCleanData] = useState<string[]>([])
    const [ready,setReady] = useState(false)
    const [isGrayed,setGrayed] = useState(false)
    const [attestationData,setAttestationData] = useState<string[]>([])
    const createAttestation = async(answer:boolean) => {
        try {
            setGrayed(true)
            const toastId = toast.loading("Your vote saving to EAS")
            const EASUID = await makeAttestation(SchemaType.Vote,answer)
            toast.dismiss(toastId)
            toast((t)=>
                (<span>
                                Your vote saved to EAS Successfully!<br/>
                                    <a href={`${EASSCAN_URL}${EASUID}`} className="font-bold text-[#539165]"
                                    onClick={()=>toast.dismiss(t.id)}
                                    >Click here to go EAS Proof</a>
                                </span>)
            )

            const toasterId = toast.loading("Your vote saving to Contract")
            await write({
                args:[
                    0,0,true,EASUID.slice(2,34)
                ]
            })
            toast.success("Your vote saved contract to successfully!",{
                id:toasterId
            })

           // window.location.reload()
        }catch(error) {
            
            toast.error("Error")

        }

    }
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                var response: ApolloQueryResult<any> = await getDatasFromGraphQL()
                const attesterData: AttesterData[] = response.data.attestations
    
                const attestionID: string[] = []
                const encodedData: string[] = [];
                attesterData.forEach((veri) => {
                    const atID = veri["id"]
                    const encoded: any = getStringFromHexString(veri["data"], SchemaType.Vote)
                    attestionID.push(atID)
                    encodedData.push(encoded);
                })
                setCleanData(encodedData)
                setAttestationData(attestionID)
                setReady(true) // Sayfa renderlanabilir
            } catch (error) {
                console.error("GRAPHQL ERROR")
                throw error
            }
        }, )
    
        return () => {
            clearInterval(interval);
        };
    }, [attestationData]);

    const {data,write,isLoading,isSuccess} = useContractWrite({
        address: "0xff3bE0a7044Cc495e00E1Eb2f8Bf996Ed5B800Ee",
        abi:[
            {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_projectID",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_reqID",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "_vote",
                    "type": "bool"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "_EAS_UID",
                    "type": "bytes32"
                  }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
        ],
        functionName:"vote",
        value:parseEther("0.1")
    })

    const renderData = (data:any, attestationData:any) => {
        return data?.slice(0).reverse().map((item:any, index:number) => {
            const isApproved = item[2].value?.value === true;
            const statusColor = isApproved ? '#65b550' : '#b55052';
            const statusMessage = isApproved ? 'approved' : 'rejected';
            const projectName = parseInt(item[0]?.value?.value) === 0 ? "Smile": "Dessay"
            const imageUrl = parseInt(item[0]?.value?.value) === 0 ? '/psmile.png' : '/pdessay.png';
            const emoji = isApproved ?             
            <img 
                src={'/confirm.png'}
                className=' hover:scale-105 duration-300'
                width={32}
                height={32}
                alt='approve'
            />
            :
            <img 
                src={'/cross.png'}
                className=' hover:scale-105 duration-300'
                width={32}
                height={32}
                alt='refuse'
            />
            return (
                <div key={index} className='flex flex-row gap-2 items-center mx-4'>
                    <Image src={imageUrl} width={50} height={50} alt={isApproved ? 'psmile' : 'pdessay'}/>
                    <Link href={`${EASSCAN_URL}${attestationData[index]}`}>
                        <h1 className={`text-[${statusColor}] text-xl flex gap-2`}>
                            $20 {statusMessage} for {projectName}{emoji}
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
                    <img
                        src={'/nft 1.png'}
                        width={50}
                        height={40}
                        alt='nft photo'
                        className=' m-2'
                    />
                    <img
                        src={'/nft 2.png'}
                        width={50}
                        height={40}
                        alt='nft photo'
                        className=' m-2'
                    />
                    <img
                        src={'/nft 3.png'}
                        width={50}
                        height={40}
                        alt='nft photo'
                        className=' m-2'
                    />
                    <img
                        src={'/nft 4.png'}
                        width={50}
                        height={40}
                        alt='nft photo'
                        className=' m-2'
                    />
                    <img
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
                            src={'/psmile.png'}
                            width={100}
                            height={100}
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
                    <Link href={'/project/1'} className=' flex flex-col p-2  bg-[#FFEDE0]  w-[18rem] gap-4 mx-auto custom-pointer'>
                        <div className=' flex '>
                            <Image
                                src={'/pdessay.png'}
                                width={120}
                                height={120}
                                alt=' first project'
                                className=' min-w-[6rem] my-auto p-2 flex h-[6rem] '
                            />
                            <div className=' my-auto'>
                                <div className=' font-semibold text-lg'>
                                    Dessay
                                </div>
                                <div>
                                    Dessay is an innovative platform that empowers users to create written content collectively through a decentralized approach...
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
                        </div>
                        <button
                            className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'

                        >Withdraw
                        </button>

                    </Link>
                </div>
                <button className=' text-xl mr-8 mt-4 text-end'>
                    More...
                </button>
            </div>
            <div className=' flex flex-row border-t-8 border-black border-dashed'>
                <div className='flex flex-col gap-4 p-3 w-[50%] h-[40vh] overflow-auto'>
                    <div className=' text-2xl mx-4'>
                        Smile Offers
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
                            <Image src="/Approve.png" width={100} height={100} alt='approve' className={`custom-pointer hover:scale-105 duration-200 ${isGrayed ? 'grayscale' : ''} `}
                            onClick={()=>
                                createAttestation(true)
                            }/>
                            <Image src="/Refuse.png" width={100} height={100} alt='refuse' className={`custom-pointer hover:scale-105 duration-200 ${isGrayed ? 'grayscale' : ''} `}
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
                            <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer hover:scale-105 duration-200'/>
                            <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer hover:scale-105 duration-200'/>
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
                            <Image src="/Approve.png" width={100} height={100} alt='approve' className='custom-pointer hover:scale-105 duration-200'/>
                            <Image src="/Refuse.png" width={100} height={100} alt='refuse' className='custom-pointer hover:scale-105 duration-200'/>
                        </div>
                    </div>

                </div>
                {/*Buraya EASTAN VERİLER GELECEK*/}
                <div className='flex flex-col gap-2 p-3 overflow-auto w-[50%] h-[40vh] border-black border-dashed border-l-8'>
                    <div className=' flex justify-between'>
                        <div className=' text-2xl mx-4'>
                            Smiled Offers
                        </div>
                        <div className=' underline text-gray-600'>
                            Click hearts for details!
                        </div>
                    </div>
                  
                    {
                        ready ? renderData(cleanData,attestationData) :         
                        <Image
                        src={'/maskot.png'}
                        width={300}
                        height={200}
                        className='  opacity-50 animate-jellyinfinite'
                        alt=' more cute logo'
                    />
                        
                        
                    }
                    
                <Toaster/>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Profile