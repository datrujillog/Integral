import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object().shape({
    cliente: yup.string().required("El cliente es obligatorio"),
    emailCliente: yup.string().email("Email inválido").required("El email es obligatorio"),
    observaciones: yup.string().max(500, "Máximo 500 caracteres"),
    servicios: yup.array().of(
        yup.object().shape({
            nombreServicio: yup.string().required("Servicio obligatorio"),
            fechaReunion: yup.date().min(new Date(), "Debe ser una fecha futura")
        })
    ).min(1, "Al menos un servicio requerido"),
});

function CrearSolicitud() {
    const navigate = useNavigate();
    const [errorApi, setErrorApi] = useState(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cliente: "",
            emailCliente: "",
            observaciones: "",
            servicios: [{ nombreServicio: "", fechaReunion: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "servicios"
    });

    const onSubmit = async (data) => {
        try {
            await api.post("/solicitudes", data);
            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorApi("Error al guardar la solicitud.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Crear Solicitud</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* CLIENTE */}
                <div>
                    <label className="block font-medium text-gray-700">Cliente:</label>
                    <input {...register("cliente")} className="w-full border p-2 rounded" />
                    <p className="text-sm text-red-600">{errors.cliente?.message}</p>
                </div>

                {/* EMAIL */}
                <div>
                    <label className="block font-medium text-gray-700">Email Cliente:</label>
                    <input {...register("emailCliente")} className="w-full border p-2 rounded" />
                    <p className="text-sm text-red-600">{errors.emailCliente?.message}</p>
                </div>

                {/* OBSERVACIONES */}
                <div>
                    <label className="block font-medium text-gray-700">Observaciones:</label>
                    <textarea {...register("observaciones")} className="w-full border p-2 rounded" rows={3} />
                    <p className="text-sm text-red-600">{errors.observaciones?.message}</p>
                </div>

                {/* SERVICIOS */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Servicios</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-4 rounded mb-4 bg-gray-50">
                            <div className="mb-2">
                                <label className="block text-gray-700">Nombre del Servicio:</label>
                                <input {...register(`servicios.${index}.nombreServicio`)} className="w-full border p-2 rounded" />
                                <p className="text-sm text-red-600">{errors.servicios?.[index]?.nombreServicio?.message}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700">Fecha de Reunión:</label>
                                <input type="datetime-local" {...register(`servicios.${index}.fechaReunion`)} className="w-full border p-2 rounded" />
                                <p className="text-sm text-red-600">{errors.servicios?.[index]?.fechaReunion?.message}</p>
                            </div>
                            <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm mt-2">
                                Eliminar servicio
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={() => append({ nombreServicio: "", fechaReunion: "" })}
                        className="text-blue-600 font-medium"
                    >
                        + Agregar servicio
                    </button>
                </div>

                {/* ERRORES Y ENVÍO */}
                {errorApi && <p className="text-red-600">{errorApi}</p>}

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Guardar Solicitud
                </button>
            </form>
        </div>
    );
}

export default CrearSolicitud;
