const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const requestsRoutes = require('./routes/solicitudes.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api/solicitudes', requestsRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




