import {gql} from "@apollo/client";

export const IMAGE_SERVER: string = "http://167.71.41.1/images/"
export const GRAPHQL_ENDPOINT: string = "https://sepolia.easscan.org/graphql"
export const TestWallet: string = "0x3a7f02D4838181Dd17f0d42194A256f8BEC19A98"
export const EASSCAN_URL: string = "https://sepolia.easscan.org/attestation/view/"
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
export const VoteSchemaUID: string = "0xc9a0e07bb96e4e6c0983b5b5b3c072c00244f43e1cb41d442f3b7fbeb34cec6f"
export const DonationSchemaUID: string = "0xeb9b167be22489721772a882dc705f1c342cc21960353e6970e375c8886723eb"
export const ProjectSchemaEncoderTemplate: string = "string projectName, address owner, " +
    "uint64 timestamp, uint256 goalAmount, uint256 nftPrice"

export const VoteSchemaEncoderTemplate: string = "uint64 testProjectID,address testVoter,bool testAnswer"

export const DonationSchemaEncoderTemplate: string = "uint64 projectID,address donor,uint256 donatedPrice"
export enum SchemaType {
    Project = ProjectSchemaEncoderTemplate,
    Vote = VoteSchemaEncoderTemplate,
    Donation = DonationSchemaEncoderTemplate
}

export enum SchemaUIDType {
    Project = ProjectSchemaUID,
    Vote = VoteSchemaUID,
    Donation = DonationSchemaUID
}