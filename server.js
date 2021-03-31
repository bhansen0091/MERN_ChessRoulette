require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT,
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    server = app.listen(port, () => console.log(`Listening on ${port}`));


app.use(cookieParser(),cors({credentials:true, origin: 'http://localhost:3000'}),express.json(),express.urlencoded({"extended":true}));

require('./server/config/database.config');
require('./server/routes/user.routes')(app);
require('./server/routes/game.routes')(app);  // eventually, pull in game routes