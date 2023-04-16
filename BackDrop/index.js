import { ApolloServer } from 'apollo-server';
import typeDefs from './src/schema/type-defs.js';
import resolvers from './src/schema/resolvers.js';
import sequelize from './src/model/db.js';
import { CustomError } from './src/utils/util.js';

const overrideError = (err) => {
    if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
    }
    return err;
};

sequelize.sync().then(() => console.log("db is ready!!!"));

export const apolloServer = new ApolloServer({ typeDefs, resolvers,   formatError: (error) => {
    if (error.originalError instanceof CustomError) {
      // Custom error handling for your custom error classes
      const { message, statusCode } = error.originalError;
      return { message, statusCode };
    }
    // Fallback error handling for other errors
    const { message, extensions } = error;
    const statusCode = extensions?.exception?.statusCode || 500;
    return { message, statusCode };
  },
});

apolloServer.listen().then(({url}) =>{
    console.log(`Server is running on port: ${url}`);
})
export default apolloServer;

