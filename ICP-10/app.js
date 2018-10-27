// required packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const port = 3000;
var port = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// for any matching path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(){
    console.log("Server running on localhost: " + port);
});
