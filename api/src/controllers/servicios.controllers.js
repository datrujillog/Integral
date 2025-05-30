

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


exports.updateService = async (req, res) => {
    const { id } = req.params;
    const {
        nombreServicio,
        fechaReunion,
        comentarios,
        costoEstimado,
        estadoServicio
    } = req.body;

    try {
        const servicio = await prisma.servicioSolicitado.findUnique({
            where: { id: parseInt(id) }
        });

        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado.' });
        }

        if (['APROBADO', 'RECHAZADO', 'VENCIDO'].includes(servicio.estadoServicio)) {
            return res.status(403).json({
                error: `El servicio ya está en estado ${servicio.estadoServicio} y no puede modificarse.`
            });
        }

        const datosActualizados = {};

        if (nombreServicio) datosActualizados.nombreServicio = nombreServicio;

        if (fechaReunion) {
            const fecha = new Date(fechaReunion);
            if (fecha <= new Date()) {
                return res.status(422).json({ error: 'La fecha de reunión debe ser futura.' });
            }
            datosActualizados.fechaReunion = fecha;
        }

        if (comentarios !== undefined) datosActualizados.comentarios = comentarios;

        if (estadoServicio) {
            if (!['PENDIENTE', 'APROBADO', 'RECHAZADO'].includes(estadoServicio)) {
                return res.status(400).json({ error: 'Estado no válido.' });
            }
            datosActualizados.estadoServicio = estadoServicio;

            // Si se aprueba, se puede agregar costoEstimado
            if (estadoServicio === 'APROBADO') {
                if (typeof costoEstimado !== 'number' || costoEstimado <= 0) {
                    return res.status(400).json({ error: 'Debe asignar un costo válido al aprobar el servicio.' });
                }
                datosActualizados.costoEstimado = costoEstimado;
            }
        }

        const servicioActualizado = await prisma.servicioSolicitado.update({
            where: { id: parseInt(id) },
            data: datosActualizados
        });

        return res.json(servicioActualizado);
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
