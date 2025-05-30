import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function DetalleSolicitud() {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actualizando, setActualizando] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    const fetchDetalle = async () => {
        try {
            const res = await api.get(`/solicitudes/${id}`);
            setSolicitud(res.data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar la solicitud.");
        } finally {
            setLoading(false);
        }
    };

    const actualizarServicio = async (servicioId, nuevoEstado, costoEstimado) => {
        try {
            setActualizando(true);
            await api.put(`/servicios/${servicioId}`, {
                estadoServicio: nuevoEstado,
                ...(costoEstimado && { costoEstimado })
            });
            setMensaje(`Servicio actualizado a ${nuevoEstado}`);
            fetchDetalle();
        } catch (error) {
            console.error(error);
            setMensaje("Error al actualizar servicio");
        } finally {
            setActualizando(false);
        }
    };

    const eliminarServicio = async (servicioId) => {
        try {
            setActualizando(true);
            await api.delete(`/servicios/${servicioId}`);
            setMensaje("Servicio eliminado");
            fetchDetalle();
        } catch (error) {
            console.error(error);
            setMensaje("No se puede eliminar este servicio");
        } finally {
            setActualizando(false);
        }
    };

    useEffect(() => {
        fetchDetalle();
    }, [id]);

    if (loading) return <p className="p-4">Cargando...</p>;
    if (error) return <p className="text-red-600 p-4">{error}</p>;
    if (!solicitud) return null;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Solicitud #{solicitud.id}
            </h1>

            <div className="space-y-2 mb-6">
                <p><span className="font-semibold">Cliente:</span> {solicitud.cliente}</p>
                <p><span className="font-semibold">Email:</span> {solicitud.emailCliente}</p>
                <p><span className="font-semibold">Estado:</span> {solicitud.estado}</p>
                <p><span className="font-semibold">Fecha Solicitud:</span> {new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
                {solicitud.observaciones && (
                    <p><span className="font-semibold">Observaciones:</span> {solicitud.observaciones}</p>
                )}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">Servicios</h2>

            {mensaje && (
                <div className="mb-4 text-sm text-blue-700 bg-blue-100 p-2 rounded border border-blue-300">
                    {mensaje}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Nombre Servicio</th>
                            <th className="p-2 border">Fecha Reunión</th>
                            <th className="p-2 border">Estado</th>
                            <th className="p-2 border">Costo</th>
                            <th className="p-2 border">Comentarios</th>
                            <th className="p-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitud.servicios.map((s) => (
                            <tr key={s.id}>
                                <td className="p-2 border">{s.nombreServicio}</td>
                                <td className="p-2 border">{new Date(s.fechaReunion).toLocaleString()}</td>
                                <td className="p-2 border">{s.estadoServicio}</td>
                                <td className="p-2 border">
                                    {s.costoEstimado ? `$${s.costoEstimado}` : "-"}
                                </td>
                                <td className="p-2 border">{s.comentarios || "-"}</td>
                                <td className="p-2 border space-x-2">
                                    {s.estadoServicio === "PENDIENTE" ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    const costo = prompt("Costo estimado:");
                                                    if (costo && !isNaN(costo)) {
                                                        actualizarServicio(s.id, "APROBADO", parseFloat(costo));
                                                    }
                                                }}
                                                className="text-green-600 hover:underline"
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                onClick={() => actualizarServicio(s.id, "RECHAZADO")}
                                                className="text-yellow-600 hover:underline"
                                            >
                                                Rechazar
                                            </button>
                                            <button
                                                onClick={() => eliminarServicio(s.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 italic">No editable</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {actualizando && <p className="mt-4 text-sm text-gray-500">Actualizando...</p>}
        </div>
    );
}

export default DetalleSolicitud;
