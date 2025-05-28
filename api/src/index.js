const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
// const solicitudesRoutes = require('./routes/solicitudes.routes');
// const serviciosRoutes = require('./routes/servicios.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
// app.use('/api/solicitudes', solicitudesRoutes);
// app.use('/api/servicios', serviciosRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




