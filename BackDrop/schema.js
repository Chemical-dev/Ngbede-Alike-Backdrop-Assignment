import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

// Define the GraphQL types
const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    accountName: { type: GraphQLString },
    accountNumber: { type: GraphQLString },
    bankCode: { type: GraphQLString }
  })
});

// Define the root Query type
const input = {
    accountName: { type: GraphQLString },
    bankCode: { type: GraphQLString }
}
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAccount: {
      type: AccountType,
      args: {
        accdetail: { type: input }
      },
      resolve(parent, args) {
        // Logic to fetch user data
        // Example: return fetchUserById(args.id);
      }
    }
  }
});

// Define the root Mutation type
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        // Logic to create a new user
        // Example: return createUser(args.name, args.email);
      }
    }
  }
});

// Create the GraphQL schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

module.exports = schema;
