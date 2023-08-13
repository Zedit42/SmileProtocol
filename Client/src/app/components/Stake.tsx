"use client"
import Image from 'next/image';
import {useEffect, useState} from 'react';
import { parseEther } from 'viem'
import { useContractWrite, useAccount,useNetwork,usePrepareContractWrite} from 'wagmi'
import { MAIN_CONTRACT} from '../../../config'
import toast, { Toaster } from 'react-hot-toast';
import { switchNetwork} from '@wagmi/core'
const Stake = () => {
    const {chain,chains} = useNetwork()
  const [tokenId, setTokenId] = useState('')
  const account = useAccount()
  const [activeTab, setActiveTab] = useState(1);
  const [inputValue, setInputValue] = useState<number | ''>(0);
  const [correctChain,setCorrectChain] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value !== '' ? parseFloat(event.target.value) : '';
    setInputValue(newValue);
  };
    const network = async () => {
        try{
            await switchNetwork({
                chainId: 420,
            })
            toast.success(`You are successfully changed network to Optimism Goerli`)
        }catch(error) {
            toast.error("User denied wallet change action")
        }
    }


  const [rotation, setRotation] = useState(0);
  const mainAddress:string = "0x60B3D95D00e98d14ec080D51752Ba137186CFaAd"
  const handleSVGClick = () => {
    setRotation((rotation + 180) % 360);
  };

    useEffect(() => {
       if(chain) {
           if(chain.id === 420) {
               setCorrectChain(true)
           }else {
               setCorrectChain(false)
           }
       }


    }, [chain]);


  const {write,isSuccess,isLoading,isError} = useContractWrite({
    // CCIP-BnM address for approving
    address: '0xaBfE9D11A2f1D61990D1d253EC98B5Da00304F16',
    abi: [
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
      value:parseEther("0.1"),
    functionName: 'approve',       
  })
    const {write: writeForStake,data:writeForData,isSuccess:successForData} =
        useContractWrite({
            //buySMILE address
            address: `0x${MAIN_CONTRACT}`,
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "buySMILE",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            functionName: "buySMILE",
            value:parseEther("0.1")
        })




  const tabContent = [
    () =>

            <div className=' w-[90%] mx-auto h-[70vh] flex flex-col pt-[8rem] '>
                <div className=' flex flex-col'>
                    <div className=' flex border-4 border-dashed border-black justify-between'>
                        <input
                            type="number"
                            id="number"
                            placeholder={'0'}
                            className=' p-2 text-black placeholder:text-black bg-[#FFF9ED] !h-[3rem] w-full text-xl'
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)}

                        />

                        <Image
                            src={'/chainlink.png'}
                            width={44}
                            height={24}
                            alt='ccip token'
                            className=' p-1'
                        />

                    </div>
                    <button className={`${rotation !== 0 ? `rotate-${rotation}` : ''} duration-300`} onClick={handleSVGClick}>
                      <svg className='my-8 scale-[3] mx-auto rotate-90'  xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>                    
                    </button>
                    <div className=' flex border-4 border-dashed border-black justify-between'>
                        <input
                            type="number"
                            id="number"
                            placeholder={'0'}
                            className=' p-2 text-black placeholder:text-black bg-[#FFF9ED] !h-[3rem] w-full text-xl'
                            value={tokenId === '' ? '' : tokenId}
                            onChange={(e) => setTokenId(e.target.value)}
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
                    <button className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'
                    onClick={async()=> {
                        if(!correctChain) {
                            await network()
                        }
                        else {
                            write({
                                args: [mainAddress, parseEther(tokenId)]
                            })
                        }
                    }}
                    >{correctChain ? 'Approve': 'Wrong Network'}</button>
                    <button className=' bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl min-w-[12rem]'
                    onClick={()=>
                      writeForStake({
                        args:[parseEther(tokenId)]
                      })
                      
                    }
                    disabled={!correctChain}
                    >
                        {correctChain ? 'Stake': 'Wrong Network'}
                    </button>
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
        width={400}
        height={200}
        className=' absolute bottom-0 right-0 -z-10'
        alt=' more cute logo'
      />
      </div>

        <Toaster/>
    </div>

  );
};

export default Stake;
