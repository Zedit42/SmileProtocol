import { ethers } from "ethers"
const provider=new ethers.JsonRpcProvider("https://ava-testnet.public.blastapi.io/ext/bc/C/rpc")
export const MAIN_CONTRACT:string = "0xff3bE0a7044Cc495e00E1Eb2f8Bf996Ed5B800Ee"
export const DESTINATION_CONTRACT:string = "0xBf2429F9676553Af7c0b772fbb3B3B3147918c84"
export const SOURCE_CONTRACT:string = "0x8156e3cbb3bd1430EcbF28A640737853b310af54"
export const DESTINATION_CHAIN:string = "2664363617261496610"
export const TOKEN_CONTRACT:string = '0x806eb963885ffd606f4afb31c9f9047b811f4c7d'

const ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "router",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "ccipbnm",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "messageId",
          "type": "bytes32"
        }
      ],
      "name": "MessageSent",
      "type": "event"
    },
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
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

  export const SOURCE_DONOR = new ethers.Contract(SOURCE_CONTRACT,ABI,)