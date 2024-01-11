'use strict';

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;

const initDB = require('./engine/db').initDB;
const model = require('./engine/model');
const connectModel = model.connectModel;
const setupServer = () => {
    // set the view engine to ejs
    app.set('view engine', 'ejs');

    // routes
    app.use(express.json());
    const responseTraits = (req, res, next) => {
        res.sendOK = () => {
            res.json({
                "status": "OK",
                "message": "success",
            })
        }
        res.sendData = (data) => {
            res.json({
                "status": "OK",
                "message": "success",
                "data": data,
            })
        }

        req.userId = () => {
            return req.headers['x-user-id']
        }
        
        next(); // Call next() to pass control to the next middleware or route handler
    };
    app.use(responseTraits)
    app.use('/', require('./routes/web')());
    app.use('/', require('./routes/api')());
    
    // start server
    const server = app.listen(port);
    console.log('Express started. Listening on %s', port);
}

initDB().then((uri) => {
    connectModel()
    return uri
}).then(() => {
    console.log("DB Initialized")
    setupServer();
});

