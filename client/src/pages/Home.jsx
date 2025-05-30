import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [estado, setEstado] = useState("");
    const [cliente, setCliente] = useState("");
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(5); // puedes cambiar a 20, 50, etc.
    const [total, setTotal] = useState(0);

    const fetchSolicitudes = async () => {
        try {
            const params = {
                estado,
                cliente,
                fechaDesde,
                fechaHasta,
                page,
                limit,
            };

            const res = await api.get("/solicitudes", { params });
            setSolicitudes(res.data.data);
            setTotal(res.data.total);
        } catch (error) {
            console.error("Error al cargar solicitudes", error);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, [page]);

    return (
        <><div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Solicitudes de Servicios</h1>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="p-2 border rounded" />
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Todos los estados</option>
                    <option value="ABIERTA">Abierta</option>
                    <option value="EN_PROCESO">En Proceso</option>
                    <option value="CERRADA">Cerrada</option>
                    <option value="CANCELADA">Cancelada</option>
                </select>
                <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    className="p-2 border rounded" />
                <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    className="p-2 border rounded" />
            </div>

            <button
                onClick={fetchSolicitudes}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                Aplicar filtros
            </button>

            <Link
                to="/crear"
                className="bg-green-600 text-white px-4 py-2 rounded ml-2"
            >
                Crear nueva solicitud
            </Link>

            {/* Tabla de resultados */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Cliente</th>
                            <th className="p-2 border">Estado</th>
                            <th className="p-2 border">Fecha Solicitud</th>
                            <th className="p-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((s) => (
                            <tr key={s.id}>
                                <td className="p-2 border">{s.id}</td>
                                <td className="p-2 border">{s.cliente}</td>
                                <td className="p-2 border">{s.estado}</td>
                                <td className="p-2 border">
                                    {new Date(s.fechaSolicitud).toLocaleDateString()}
                                </td>
                                <td className="p-2 border">
                                    <Link
                                        to={`/solicitud/${s.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Ver Detalle
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {solicitudes.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No hay solicitudes para mostrar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div><div className="mt-6 flex justify-between items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span className="text-sm text-gray-600">
                    Página {page} de {Math.ceil(total / limit)}
                </span>

                <button
                    disabled={page * limit >= total}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div></>
    );
}

export default Home;
