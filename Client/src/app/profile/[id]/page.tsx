"use client"
import Header from '@/app/components/Header'
import Hero from '@/app/components/Profile'
import '../../globals.css'
import React, {useEffect, useState} from 'react'
import {ApolloQueryResult} from "@apollo/client";
import {getDatasFromGraphQL} from "../../../../constants/global";
import {getStringFromHexString} from "../../../../eas";
import {SchemaType} from "../../../../constants/";
import {SchemaDecodedItem} from "@ethereum-attestation-service/eas-sdk";

interface AttesterData {
    id:string,
    data:string,
}


const Profile: React.FC = () => {
    const [cleanData,setCleanData] = useState<string[]>([])
    const [ready,setReady] = useState(false)
    const [attestationData,setAttestationData] = useState<string[]>([])
    useEffect(() => {
        const getAttesterDataGraphQL = async () => {
            try {
                var response: ApolloQueryResult<any> = await getDatasFromGraphQL()
                const attesterData: AttesterData[] = response.data.attestations

                const attestionID: string[] = []
                const encodedData: string[] = [];
                attesterData.forEach((veri) => {
                    const atID = veri["id"]
                    const encoded:SchemaDecodedItem[] = getStringFromHexString(veri["data"], SchemaType.Vote)
                    attestionID.push(atID)
                    encodedData.push(encoded);
                })
                setCleanData(encodedData)
                setAttestationData(attestionID)
                setReady(true)
            }catch (error) {
                console.error("GRAPHQL ERROR")
                throw error
            }
        }
        getAttesterDataGraphQL()
    }, []);
  return (

      ready &&
    <main className=' cursor-none '>
      <img
        src='/backgroundimage.webp'
        className=' w-full h-full fixed -z-10'
        alt='bg image'
      />
      <div className='custom-default'>
        <Header/>
        <Hero encodedData={cleanData} attestationData={attestationData}/>
      </div>
    </main>

  )
}

export default Profile
