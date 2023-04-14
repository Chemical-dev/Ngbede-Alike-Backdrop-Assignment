import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './index.js';
// const schema = require('./schema'); // Import your GraphQL schema

const app = express();

// Configure the GraphQL middleware
app.use('/graphql', graphqlHTTP({
  schema: schema, // Use your GraphQL schema
  graphiql: true // Enable GraphiQL for development/debugging
}));

// Start the Express app
const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
export default app;
