import {gql} from "@apollo/client";

export const IMAGE_SERVER: string = "http://167.71.41.1/images/"
export const GRAPHQL_ENDPOINT: string = "https://optimism-goerli-bedrock.easscan.org/graphql"
export const TestWallet: string = "0x3a7f02D4838181Dd17f0d42194A256f8BEC19A98"
export const EASSCAN_URL: string = "https://optimism-goerli-bedrock.easscan.org/attestation/view/"
// GraphQL Query
export const GET_ATTESTATION_QUERY = gql`
    query Attestations($where: AttestationWhereInput) {
  attestations(where: $where) {
    id
    data
    schemaId
  }
}
`;

// Attestation UID
export const AttestationUID: string = "0x0209010607f51c6046335e0a5d436b141e55f570b376218cf1eab28a1a0b81ee";
export const ProjectSchemaUID: string = "0x799392bb07fae6381125e8648e3f63e4a4d245c9a2c29b16392b294737c59a46"
export const VoteSchemaUID: string = "0x6bac47f3c19958786b37fd542a4f1d9b0380281c55b6a9773c0015ef110286ff"
export const DonationSchemaUID: string = "0xeb9b167be22489721772a882dc705f1c342cc21960353e6970e375c8886723eb"
export const ProjectSchemaEncoderTemplate: string = "string projectName, address owner, " +
    "uint64 timestamp, uint256 goalAmount, uint256 nftPrice"

export const VoteSchemaEncoderTemplate: string = "uint64 projectID,address voter,bool answer"

export const DonationSchemaEncoderTemplate: string = "uint64 projectID,address donor,uint256 donatedPrice"
export enum SchemaType {
    Project = "string projectName, address owner, " +
        "uint64 timestamp, uint256 goalAmount, uint256 nftPrice",
    Vote = "uint64 projectID,address voter,bool answer",
    Donation = "uint64 projectID,address donor,uint256 donatedPrice"
}

export enum SchemaUIDType {
    Project = "0x799392bb07fae6381125e8648e3f63e4a4d245c9a2c29b16392b294737c59a46",
    Vote = "0x6bac47f3c19958786b37fd542a4f1d9b0380281c55b6a9773c0015ef110286ff",
    Donation = "0xeb9b167be22489721772a882dc705f1c342cc21960353e6970e375c8886723eb"
}