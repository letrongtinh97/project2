const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const checkToken = require('./middlewave/authValidate')

// values
const port = process.env.port || 3000;


//controller 
const authController = require('./controllers/authController');
const trainingController = require('./controllers/trainingController');
const userController = require('./controllers/userController');
//body
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



//login
app.use('/auth',authController);
app.use(checkToken.isAuthenticated);

//pass token
app.use('/users', userController);
app.use('/training', trainingController);

app.listen(port, () => {
    console.log("Server listing port " + port)
});