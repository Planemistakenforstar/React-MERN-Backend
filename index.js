
const path = require('path');
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

// create the server of express
const app = express();


// database
dbConnection();

//CORS
const cors = require('cors');

// Allow your frontend domain
app.use(cors({
    origin: 'https://react-mern-production-426.up.railway.app',
    credentials: true
}));


//Directorio publico
app.use( express.static('public'));


// read and parse body
app.use(express.json());

// Routes
//auth //crear,login, renew
//todo: crud eventos
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));


app.use(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//listen petitions
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})
