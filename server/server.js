
// IMPORTS
const path = require('path');
const express = require('express');
    const app = express();
const {authMiddleware} = require('./utils/auth');
const {typeDefs, resolvers} = require('./schemas');
const {ApolloServer} = require('apollo-server-express');
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
    });
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;


// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === 'production')
    app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/', (req, res) => {  // For any otherwise-undefined GET requests, simply respond with the production-ready front-end code
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create Apollo server w/ GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();

    server.applyMiddleware({app});

    // Open Mongoose database and turn on server
    db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
    });
}

// TURN ON SERVER
startApolloServer(typeDefs, resolvers);