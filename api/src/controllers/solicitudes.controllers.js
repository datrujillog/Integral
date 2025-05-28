const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createRequest = async (req, res) => {
    try {

        const { cliente, emailCliente, observaciones, servicios } = req.body;

        if (!cliente || !emailCliente || !Array.isArray(servicios) || servicios.length === 0) {
            return res.status(400).json({ error: 'Datos incompletos o servicios vacíos.' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente)) {
            return res.status(400).json({ error: 'Email no válido.' });
        }

        const ahora = new Date();
        for (const s of servicios) {
            if (!s.nombreServicio || !s.fechaReunion) {
                return res.status(400).json({ error: 'Todos los servicios deben tener nombre y fecha.' });
            }

            const fechaReunion = new Date(s.fechaReunion);
            if (fechaReunion <= ahora) {
                return res.status(422).json({ error: 'La fecha de reunión debe ser futura.' });
            }
        }

        const nuevaSolicitud = await prisma.Solicitud.create({
            data: {
                cliente,
                emailCliente,
                observaciones,
                estado: 'ABIERTA',
                servicios: {
                    create: servicios.map(s => ({
                        nombreServicio: s.nombreServicio,
                        fechaReunion: new Date(s.fechaReunion),
                        estadoServicio: 'PENDIENTE'
                    }))
                }
            },
            include: {
                servicios: true
            }
        });

        return res.status(201).json(nuevaSolicitud);


    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        // return res.status(500).json({ error: 'Error interno del servidor' });

    }
}