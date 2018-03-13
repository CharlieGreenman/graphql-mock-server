import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();
const expressGraphQL = require('express-graphql');

graphQLServer.use('/graphql',(req,res,next)=>{

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Allow', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}, expressGraphQL({
    schema,
    graphiql: true
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
