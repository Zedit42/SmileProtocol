import {Attestation, EAS, SchemaDecodedItem, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import {BrowserProvider, ethers} from "ethers";
import {AttestationUID, DonationSchemaUID, ProjectSchemaUID, SchemaType, TestWallet, VoteSchemaUID} from "../constants"

const EASContractAddress: string = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const eas:EAS = new EAS(EASContractAddress);
const RPCprovider = new ethers.JsonRpcProvider("https://gateway.tenderly.co/public/sepolia");

eas.connect(RPCprovider);

export async function getAttestation(AttestatonID:string=AttestationUID): Promise<Attestation> {
    try {
        return await eas.getAttestation(AttestatonID)
    } catch (error) {
        console.error("Error fetching attestation:", error)
        throw error;
    }
}

export function getStringFromHexString(hexString: string,schemaType:SchemaType): SchemaDecodedItem[] {
    let schemaEncoder:SchemaEncoder
    try {
        if(schemaType == SchemaType.Project) {
            schemaEncoder = new SchemaEncoder(SchemaType.Project)
        }else if(schemaType == SchemaType.Donation) {
            schemaEncoder = new SchemaEncoder(SchemaType.Donation)
            debugger
        }else if(schemaType == SchemaType.Vote) {
            schemaEncoder = new SchemaEncoder(SchemaType.Vote)
        }

        let schemaDecodedItems = schemaEncoder.decodeData(hexString);
        return schemaDecodedItems;
    } catch (error) {
        console.error("Error decoding hex to string:", error)
        throw error
    }
}
export async function makeAttestation(schemaType:SchemaType,MetamaskProvider:any, answer:boolean) {
    const provider = new BrowserProvider(MetamaskProvider)
    const signer = new ethers.Wallet("ebd43fcb6c9b837b9ff3f2ed5424884227c90de923a4820aa3f56230cfcc9681"
        ,provider)
    eas.connect(signer)

    var schemaEncoder:SchemaEncoder = new SchemaEncoder(schemaType)
    let encodedData, schemaID;
    if (schemaType === SchemaType.Project) {
        encodedData = schemaEncoder.encodeData([
            {name: "projectName", value: "EAS Test", type: "string"},
            {name: "owner", value: TestWallet, type: "address"},
            {name: "timestamp", value: Date.now(), type: "uint64"},
            {name: "goalAmount", value: 10000, type: "uint256"},
            {name: "nftPrice", value: 10, type: "uint256"}
        ])
        schemaID = ProjectSchemaUID
    } else if (schemaType === SchemaType.Vote) {
        encodedData = schemaEncoder.encodeData([
            {name:"testProjectID",value:1,type:"uint64"},
            {name:"testVoter",value:TestWallet,type:"address"},
            {name:"testAnswer",value:answer,type:"bool"}
        ])
        schemaID = VoteSchemaUID
    } else if (schemaType === SchemaType.Donation) {
        encodedData = schemaEncoder.encodeData([
            {name:"projectID",value:1,type:"uint64"},
            {name:"donor",value:TestWallet,type:"address"},
            {name:"donatedPrice",value:10,type:"uint256"}
        ])
        schemaID = DonationSchemaUID
    }
    const AttestationTX = await eas.attest({
        schema:schemaID,
        data: {
            recipient:"0x0000000000000000000000000000000000000000",
            expirationTime:0,
            revocable:false,
            data: encodedData
        },
    });
    return await AttestationTX.wait()




}


