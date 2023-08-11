import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GET_ATTESTATION_QUERY, GRAPHQL_ENDPOINT, TestWallet, VoteSchemaUID} from "./index";

export const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
})

export function splitAndReorderTextByDot(text: string): any[] {
    const parts: string[] = text.split('.').filter(part => part.trim() !== '');

    const totalParts: number = parts.length;
    const partsPerPart: number = Math.ceil(totalParts / 6);

    const splitText: any[] = [];
    let currentIndex: number = 0;

    for (let i: number = 0; i < 6; i++) {
        const part: string = parts.slice(currentIndex, currentIndex + partsPerPart).join('. ');
        splitText.push(part);
        currentIndex += partsPerPart;
    }

    return splitText;
}


export async function getDatasFromGraphQL(attesterAddress: string = TestWallet ) {
    try{
        return client.query({
            query: GET_ATTESTATION_QUERY,
            variables: {
                where: {
                    attester: {
                        equals: attesterAddress
                    },
                    schemaId:{
                        equals: VoteSchemaUID
                    }
                }
            }
        })
    } catch (error) {
        console.error(error)
        throw error
    }

}
export interface ProjectDetails {
    projectid: number,
    description: string,
    projectimage: string,
    roadmapimage: string
}