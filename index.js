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
app.use(express.static('public'));

// read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// IMPORTANT FIX: Use '/*' instead of '*'
app.get('/*', (req, res) => {
    // Don't serve index.html for API routes (they should have been handled already)
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// listen petitions
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});