// require express, dotenv, mongoose
const express = require('express');
const port = require('./config').PORT;
require('dotenv').config();

// import all of the models (dao)
const Characters = require('./api/characters/characters.dao');
const Classes = require('./api/classes/classes.dao');
const Races = require('./api/races/races.dao');
const Players = require('./api/players/players.dao');

// import the router generator function
const routerGen = require('./api/router');


const db = require('./db');
const server = express();

//middleware stuff:
server.use(express.json());

// tell the database to actually connect...
db();

// tell the server to use all of the routes
server.use('/', routerGen(Players));
server.use('/', routerGen(Classes));
server.use('/', routerGen(Races));
server.use('/', routerGen(Characters));

server.listen(port, (err) =>
{
    if (err)
    {
        console.log('Error starting server: ', err);
    }
    console.log(`Server listening on port ${port}...`);
});