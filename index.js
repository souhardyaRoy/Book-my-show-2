require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
const {connectToDB}=require('./src/configs/mysql.db')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
  });

app.use('/bookMyShow/v1', require('./src/routes/createClient_route'))


// To handle the error of missmatching api url
app.all('*', function(req, res) {
    throw new Error("Not Found")
})

app.use(function(e, req, res, next) {
    if (e.message === "Not Found") {
        res.status(404).json({error: {message: e.message, 
        errorInfo :"please check the api you are trying to access"}});
    }
});

app.listen(PORT, async() => {
 await connectToDB();
  console.log(`Server started on localhost:${PORT}`)
});
