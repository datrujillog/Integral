

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addService = async (req, res) => {
    const { id: applicationId } = req.params;
    const { nombreServicio, fechaReunion, comentarios } = req.body;

    try {
        const solicitud = await prisma.solicitud.findUnique({
            where: { id: parseInt(applicationId) }
        });

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada.' });
        }

        if (['CERRADA', 'CANCELADA'].includes(solicitud.estado)) {
            return res.status(403).json({ error: 'No se puede agregar servicios a una solicitud cerrada o cancelada.' });
        }

        if (!nombreServicio || !fechaReunion) {
            return res.status(400).json({ error: 'nombreServicio y fechaReunion son obligatorios.' });
        }

        const fecha = new Date(fechaReunion);
        if (fecha <= new Date()) {
            return res.status(422).json({ error: 'La fecha de reunión debe ser futura.' });
        }

        // const nuevoServicio = await prisma.servicioSolicitado.create({
        //     data: {
        //         applicationId: parseInt(applicationId),
        //         nombreServicio,
        //         fechaReunion: fecha,
        //         comentarios,
        //         estadoServicio: 'PENDIENTE'
        //     }
        // });

        const nuevoServicio = await prisma.servicioSolicitado.create({
            data: {
                nombreServicio,
                fechaReunion: fecha,
                comentarios,
                estadoServicio: 'PENDIENTE',
                solicitud: {
                    connect: { id: parseInt(applicationId) }
                }
            }
        });

        return res.status(201).json(nuevoServicio);
    } catch (error) {
        console.error('Error al agregar servicio:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
