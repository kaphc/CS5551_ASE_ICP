//Importing Require Modules
const express =  require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const passport = require('passport');

const config = require('./config/database');
const routes = require("./routes/routes");
// const passportConfig = require('./config/passport');

//Initializing express server.
const app = express();

//Port number
const port = 3000;

//Connecting to database.
mongoose.connect(config.database);

//Passing app to route module to configure the routes.
routes(app);

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Cors is used to allow other domains to access our application.
app.use(cors());

//BodyParser is used to parse in coming request body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
// app.use(passport.initialize());
// app.use(passport.session());
// passportConfig.configStrategy(app,passport);

//On Database Connected, displaying the database connected message on console.
mongoose.connection.on('connected', () => {
    console.log("Database :"+ config.database +" connection successfully");
});

//On Database Connection failed, displaying the database connected message on console.
mongoose.connection.on('error', (err) => {
    console.log("Database :"+ config.database +" connection failed. Reason :"+ err);
});

//Starting the server.
app.listen(port, ()=>{
    console.log("Sever running in port : "+ port);
});