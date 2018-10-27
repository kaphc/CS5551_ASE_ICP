// required packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const port = 3000;
var port = process.env.PORT || 8080;


const app = express();
const route = require('./routes/student');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/icp_9', route);

// for any matching path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function(){
    console.log("Server running on localhost: " + port);
});
