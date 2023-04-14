import { gql } from 'apollo-server';

const typeDefs = gql`
input  InputDetail {
    accountName:String!
    accountNumber:String!
    bankCode:String!
}

input accountQueryInput {
    accountNumber:String!
    bankCode:String!
}

type Account {
    accountName:String!
    accountNumber:String!
    bankCode:String!
    verified:Boolean!
}

type Query {
  accountDetail(input: accountQueryInput):Account!
}

type Mutation {
  validateAccount(input: InputDetail):Account
}
`;

export default typeDefs;