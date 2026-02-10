
const express = require('express')
const app = express();
const bodyParser =  require('body-parser');
const cors = require('cors');


const database = require('./database')

const PORT =  3000 || process.env.PORT ;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



const pmsRouter = require('./routes/router.js');



app.use('/api/v1/pms', pmsRouter);



// custom 404 page 
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page 
app.use(function (req, res, next) {
    // console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(PORT)
$ git config --global user.name "Paulajogwu"
$ git config --global user.email "paulajogwu@gmail.com"