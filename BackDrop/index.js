import { ApolloServer } from 'apollo-server';
import typeDefs from './src/schema/type-defs.js';
import resolvers from './src/schema/resolvers.js';
import sequelize from './src/model/db.js';
import { GraphQLSchema } from 'graphql';

const overrideError = (err) => {
    if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
    }
    return err;
};

sequelize.sync().then(() => console.log("db is ready!!!"));

export const apolloServer = new ApolloServer({ typeDefs, resolvers, formatError: overrideError});

apolloServer.listen().then(({url}) =>{
    console.log(`Server is running on port: ${url}`);
})
export default apolloServer;

