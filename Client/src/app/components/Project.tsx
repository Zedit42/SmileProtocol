"use client"
import React, { useState } from 'react';
import Button from './Button';
import { MdVerified } from 'react-icons/md'
import Image from 'next/image';
import {ethers} from "ethers"
import Campaing from './Campaing';
import { switchNetwork } from '@wagmi/core'
import {useContractWrite,useAccount} from 'wagmi'
import { SOURCE_CONTRACT,DESTINATION_CHAIN,DESTINATION_CONTRACT,SOURCE_DONOR } from '../../../config';
import {parseEther} from "viem"
const Hero = () => {
  const [tokenId, setTokenId] = useState('')
  const {data,write,isLoading,isSuccess} = useContractWrite({
    address: SOURCE_CONTRACT,
    abi:[
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "destinationChainSelector",
            "type": "uint64"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "projectId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "buySmileAndDonate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ],
    functionName: 'buySmileAndDonate'
  })
  const {write:approveWrite,isLoading:approveLoading,isSuccess:approveSuccess} = useContractWrite({
    address: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
    abi:[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName:"approve"
  })




  const network = async() => {
    await switchNetwork({
    chainId: 43113,
  })}

    // useEffect(()=>{
    //
    //     if (projectID) {
    //         const getProjectDetailsFromDB = async () => {
    //             const prisma = new PrismaClient();
    //             var dataDB = await prisma.projects.findUnique({
    //                 where: {
    //                     projectid: parseInt(projectID)
    //                 }
    //             })
    //             setDBData(dataDB)
    //         }
    //         getProjectDetailsFromDB()
    //     }
    //
    // }, [projectID])


  return (
    <div className="max-w-[75vw] mx-auto px-4 my-6 flex gap-[4rem] ">
      <div className=' '>
        <div className=" w-[45vw] border-8 border-black">
          <Image
          src={'/smileprotocol.gif'}
          width={1920}
          height={1080}
          alt='project image'
          className=' object-cover'
          />
        </div>

        <div className="flex flex-wrap justify-start gap-3 mt-8 ">
            <Button text="Campaign" onClick={() => console.log('clicked!')} isSelected={true}/>
            <Button text="Roadmap" onClick={() => console.log('clicked!')} />
            <Button text="Updates" onClick={() => console.log('clicked!')} />
            <Button text="Supporters" onClick={() => console.log('clicked!')} />
            <Button text="Comments" onClick={() => console.log('clicked!')} />
        </div>

        <Campaing/>
      </div>

      <div className=" left-3 top-32 min-h-[70vh] h-full w-[22vw] pb-12 p-5 bg-[#FFF9ED] border-8 border-black text-center">

        <h1 className=' font-extrabold text-4xl  '>Smile Protocol</h1>
        <div className='flex flex-row justify-center items-center gap-1 text-xl'><MdVerified size={20} className='text-[#7fe0c5]' /><h4 className=''>Verified Project</h4></div>

        <h1 className='mt-10 font-bold text-3xl'>158,788 / 235,000 $</h1>
        <div>
          <div className=' text-2xl animate-pulse font-bold flex flex-row mt-[1rem] '>
            <p>Processing</p>
            <p className=' text-3xl ml-2'>. . .</p>
          </div>
          <div className=' border-black border-[0.3rem] w-full '>
            <div className=' my-[0.5rem] w-full grid grid-rows-2 grid-cols-10 max-w-[90%] mx-auto gap-2 items-center justify-center'>
              <div className=' bg-[#8fb3ff] p-[0.6rem]  '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-[#8fb3ff] p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
              <div className=' bg-gray-400 p-[0.6rem] '>
              </div>
            </div>
          </div>
        </div>


        <div className='flex justify-between mx-2 py-8'>
            <div>
                <h1 className=' font-bold text-4xl'>28</h1>
                <p className='font-bold'>days to go</p>
            </div>
            <div>
                <h1 className=' font-bold text-4xl'>5,699</h1>
                <p className='font-bold'>supporters</p>
            </div>
        </div>
        <input
          type="number"
          id="number"
          placeholder={'0'}
          className=' p-2 text-black placeholder:text-black border-4 border-black bg-[#FFF9ED] !h-[3rem] w-5/6 text-xl'
          value={tokenId === '' ? '' : tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button className=' hover:animate-jelly w-5/6 h-16 border-4 border-black bg-black text-[#FFF9ED] duration-200 ease-linear hover:bg-[#FFF9ED] hover:text-black text-5xl font-bold py-1 custom-pointer' onClick={
         async () => {
          
            try {
              await approveWrite({
                args:[
                  SOURCE_CONTRACT,parseEther(tokenId)
                ]
              })
              await write({
                args:[
                  BigInt(DESTINATION_CHAIN),DESTINATION_CONTRACT,0,parseEther(tokenId)
                ]
              })
                /* await SOURCE_DONOR.buySmileAndDonate(
                  BigInt(DESTINATION_CHAIN),DESTINATION_CONTRACT,0,parseEther(tokenId)
                ) */
                console.log("TX GÖNDERİLDİ")
            }catch(error) {
              console.error(error)
            }
          }}>Support</button>
      </div>
    </div>
  );
};

export default Hero;
