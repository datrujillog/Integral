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

exports.getRequests = async (req, res) => {
    try {
        const {
            estado,
            cliente,
            fechaDesde,
            fechaHasta,
            page = 1,
            limit = 10,
            orden = 'desc'
        } = req.query;

        const filtros = {};

        if (estado) filtros.estado = estado;

        if (cliente) {
            filtros.cliente = {
                contains: cliente,
                mode: 'insensitive'
            };
        }

        // if (fechaDesde || fechaHasta) {
        //     filtros.fechaSolicitud = {};
        //     if (fechaDesde) filtros.fechaSolicitud.gte = new Date(fechaDesde);
        //     if (fechaHasta) filtros.fechaSolicitud.lte = new Date(fechaHasta);
        // }

        if (fechaDesde || fechaHasta) {
            filtros.fechaSolicitud = {};
            if (fechaDesde) filtros.fechaSolicitud.gte = new Date(fechaDesde);
            if (fechaHasta) {
                // Sumar un día a fechaHasta para incluir todo el día
                const fechaHastaObj = new Date(fechaHasta);
                fechaHastaObj.setDate(fechaHastaObj.getDate() + 1);
                filtros.fechaSolicitud.lt = fechaHastaObj;
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [solicitudes, total] = await Promise.all([
            prisma.solicitud.findMany({
                where: filtros,
                skip,
                take,
                orderBy: {
                    fechaSolicitud: orden === 'asc' ? 'asc' : 'desc'
                },
                include: {
                    servicios: true
                }
            }),
            prisma.solicitud.count({ where: filtros })
        ]);

        return res.json({
            total,
            page: parseInt(page),
            limit: take,
            data: solicitudes
        });
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { cliente, emailCliente, observaciones } = req.body;

    try {

        const solicitud = await prisma.solicitud.findUnique({
            where: { id: parseInt(id) },
            include: { servicios: true }
        });

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        // Verificar que tenga al menos un servicio en estado PENDIENTE
        const tienePendientes = solicitud.servicios.some(
            s => s.estadoServicio === 'PENDIENTE'
        );

        if (!tienePendientes) {
            return res.status(403).json({
                error: 'La solicitud no puede modificarse porque no tiene servicios en estado PENDIENTE.'
            });
        }

        // Validar campos
        if (emailCliente && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente)) {
            return res.status(400).json({ error: 'Email no válido.' });
        }

        // Realizar actualización
        const solicitudActualizada = await prisma.solicitud.update({
            where: { id: parseInt(id) },
            data: {
                cliente,
                emailCliente,
                observaciones
            }
        });

        return res.json(solicitudActualizada);
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.deleteRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitud = await prisma.solicitud.findUnique({
            where: { id: parseInt(id) },
            include: { servicios: true }
        });

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada.' });
        }

        const tieneAprobados = solicitud.servicios.some(
            s => s.estadoServicio === 'APROBADO'
        );

        if (tieneAprobados) {
            return res.status(403).json({
                error: 'No se puede eliminar la solicitud porque tiene servicios aprobados.'
            });
        }

        await prisma.servicioSolicitado.deleteMany({
            where: { solicitudId: solicitud.id }
        });

        await prisma.solicitud.delete({
            where: { id: solicitud.id }
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.getRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitud = await prisma.solicitud.findUnique({
            where: { id: parseInt(id) },
            include: { servicios: true }
        });

        if (!solicitud) {
            return res.status(404).json({ error: 'Solicitud no encontrada.' });
        }

        return res.json(solicitud);
    } catch (error) {
        console.error('Error al obtener solicitud:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
