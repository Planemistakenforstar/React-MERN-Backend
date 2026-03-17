
const path = require('path');
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

// create the server of express
const app = express();


// database
dbConnection();

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


// IMPORTANT: This catch-all route MUST be LAST
// It should only handle routes that aren't API routes or static files
app.get('*', (req, res) => {
    // Check if the request is for an API route (should have been handled already)
    // Check if it's a static file (should have been handled by express.static)
    // If we get here, send index.html for client-side routing
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//listen petitions
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})
