const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

//const db = require('./model/db');
//const router = express.Router();


//controller
const userController = require('./controllers/userController')
const trainingController = require('./controllers/trainingController')

//validate
const userValidate = require('./middlewave/userValidate')

// values
const port = process.env.port || 3000;

//body
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));


app.use('/users', userController);
app.use('/training', trainingController);
app.get('/db', function (request, response) {
    pool.connect(function(err, client, done) {
      client.query('SELECT * FROM tbl_profile_user', function(err, result) {
        done();
        if (err)
        {
            return response.status(500).json({
                code: 1,
            })
        }
        else
         {
             return response.status(200).json({
                 code: 0,
                 data: result.rows,
             })
         }
      });
    });
  });

app.listen(port, () => {
    console.log("Server listing port " + port)
});