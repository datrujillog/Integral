const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const app = express();

// Import routes
const requestsRoutes = require('./routes/solicitudes.routes');
const servicesRoutes = require('./routes/servicios.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api/solicitudes', requestsRoutes);
app.use('/api/servicios', servicesRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




