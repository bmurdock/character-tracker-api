// require express, dotenv, mongoose
const express = require('express');
const argon2 = require('argon2');
const AWS = require('aws-sdk');
const cors = require('cors');
const port = require('./config').PORT;
require('dotenv').config();

// configure and get amazon credentials
AWS.config.getCredentials((err) =>
{
    if (err)
    {
        console.log('AWS credential problem: ', err.stack);
    }
});
AWS.config.update({region: 'us-west-2'});

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
server.use(cors());

const requestLogger = (req, res, next) =>
{
        const now = new Date();
        console.log(`${now}:::> Incoming request to ${req.originalUrl}`)
        next();
}
server.use(requestLogger);

// tell the database to actually connect...
db();

// tell the server to use all of the routes
server.use('/', routerGen(Players));
server.use('/', routerGen(Classes));
server.use('/', routerGen(Races));
server.use('/', routerGen(Characters));

// login route
server.post('/login', (req, res, next) =>
{
    const {username, password} = req.body;
    if (typeof username === 'undefined' || typeof password === 'undefined')
    {
        return res.status(400).json({message: 'Invalid username or password.'});
    }
    Players.get({username}, async (err, result) =>
    {
        if (err)
        {
            console.log('Error getting player: ', err);
            return res.status(400).json({message: 'Invalid username or password.'});
        }
        if (result.length === 0)
        {
            console.log('user not found');
            return res.status(400).json({message: 'Invalid username or password.'});
        }
        const user = result[0];
        try {
            if (await argon2.verify(user.password, password)) {
              // password match
                res.status(200).send({
                    message: 'We should send you a jwt.',
                    user,
                    jwt: 'not working yet',
                });
            } else {
              // password did not match
              console.log('pass did not match');
              return res.status(400).json({message: 'Invalid username or password.'});
            }
          } catch (err) {
            // internal failure
            console.log('What the heck: ', err);
          }
    })
})

// fake aws example route
server.post('/email', (req, res, next) =>
{
    const {email, name} = req.body;
    const ses = new AWS.SES;
    const fromEmail = 'bmurdock@robinsage.com';

    var params = {
        IdentityType: "EmailAddress", 
        MaxItems: 123, 
        NextToken: ""
       };
       ses.listIdentities(params, function(err, data) {
            if (err)
            {
                return res.send(err);
            }
            console.log('these are the identities: ', data);
       });

    var params = {
        Destination: {
         ToAddresses: [
            email, 
         ]
        }, 
        Message: {
         Body: {
          Html: {
           Charset: "UTF-8", 
           Data: `Hello ${name}! This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>.`
          }, 
          Text: {
           Charset: "UTF-8", 
           Data: "This is the message body in text format."
          }
         }, 
         Subject: {
          Charset: "UTF-8", 
          Data: "Test email"
         }
        }, 
        Source: fromEmail, 

       };
       ses.sendEmail(params, function(err, data) {
         if (err) {
             console.log(err, err.stack);
             return res.send('Ooops.');
         }
         else {
            console.log(data); 
            return res.send('Email sent.');

         }
       });
})

server.listen(port, (err) =>
{
    if (err)
    {
        console.log('Error starting server: ', err);
    }
    console.log(`Server listening on port ${port}...`);
});