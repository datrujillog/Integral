# Integral
Prueba Técnica - Analista de Sistemas de Información


CASO DE NEGOCIO
La empresa Integral S.A. necesita una solución informática para gestionar las solicitudes de servicios de ingeniería que recibe de sus clientes.
Contexto del Negocio
•	Los clientes pueden solicitar múltiples servicios de ingeniería en una sola solicitud
•	Cada servicio requiere una reunión de evaluación antes de ser aprobado o rechazado
•	El sistema debe permitir seguimiento completo del estado de las solicitudes
•	Se requiere automatización para cerrar solicitudes completadas
•	La aplicación debe ser una SPA (Single Page Application)
Entidades y Reglas de Negocio
Solicitud
•	ID Solicitud: Identificador único (autoincrementa)
•	Cliente: Nombre de la empresa/persona solicitante
•	Email Cliente: Para notificaciones (validar formato)
•	Fecha Solicitud: Fecha de creación (automática)
•	Estado: Abierta, En Proceso, Cerrada, Cancelada
•	Observaciones: Campo de texto libre (máximo 500 caracteres)
•	Fecha Última Modificación: Timestamp automático
Servicio Solicitado
•	ID Servicio: Identificador único
•	ID Solicitud: Referencia a la solicitud padre
•	Nombre Servicio: Descripción del servicio (requerido)
•	Fecha Reunión: Fecha programada para evaluación (debe ser futura)
•	Estado Servicio: Pendiente, Aprobado, Rechazado, Vencido
•	Comentarios: Observaciones de la reunión (opcional)
•	Costo Estimado: Valor monetario (opcional, solo si está aprobado)


Reglas de Negocio Específicas
1.	Una solicitud puede tener múltiples servicios
2.	Una solicitud solo puede modificarse si tiene al menos un servicio en estado "Pendiente"
3.	Una solicitud solo puede eliminarse si NINGÚN servicio está en estado "Aprobado"
4.	Los servicios con fecha de reunión vencida (fecha actual > fecha reunión) y estado "Pendiente" pasan automáticamente a "Vencido"
5.	Una solicitud pasa a estado "Cerrada" cuando todos sus servicios están en estado final (Aprobado, Rechazado o Vencido)

STACK TECNOLÓGICO REQUERIDO
Backend (API REST)
•	.NET 6/7/8 con Web API
•	Entity Framework Core para ORM
•	SQL Server para ORM
•	Swagger/OpenAPI para documentación
Frontend (SPA) - Elija Uno
•	Angular 15+ (Preferido) con TypeScript
•	React 18+ con TypeScript
•	Vue.js 3+ con TypeScript

PARTE 1: ANÁLISIS Y DISEÑO
1.1 Modelo Entidad-Relación
Diseñe el modelo de base de datos considerando:
•	Relaciones correctas entre entidades
•	Tipos de datos apropiados
•	Restricciones de integridad
1.2 Diagrama de Clases
Crear diagrama UML que incluya:
•	Backend: DTOs, Entities


•	Frontend: Models
1.3 Arquitectura de API
Diseñar la estructura de endpoints REST:
GET    /api/solicitudes              // Listar con filtros
GET    /api/solicitudes/{id}         // Obtener por ID
POST   /api/solicitudes              // Crear nueva
PUT    /api/solicitudes/{id}         // Actualizar
DELETE /api/solicitudes/{id}         // Eliminar
GET    /api/solicitudes/{id}/servicios // Servicios de solicitud
POST   /api/solicitudes/{id}/servicios // Agregar servicio
PUT    /api/servicios/{id}           // Actualizar servicio
DELETE /api/servicios/{id}           // Eliminar servicio
Especificar para cada endpoint:
•	Parámetros de entrada
•	Estructura de respuesta (JSON)
•	Códigos de estado HTTP
•	Validaciones requeridas

PARTE 2: DESARROLLO BACKEND 
2.1 Estructura de Base de Datos 
•	Script de creación de tablas
•	Datos de prueba (al menos 4 o 5 solicitudes con múltiples servicios)
•	Configuración de Entity Framework
2.2 Modelos y DTOs 
•	Entities: Clases de entidad con configuración EF
•	DTOs: Para requests y responses de API
•	Mapping: AutoMapper o manual entre Entities y DTOs
•	Validations: Data Annotations o FluentValidation
2.3 Controllers y Servicios 



Implementar arquitectura en capas:
SolicitudesController
•	CRUD completo con validaciones de negocio
•	Filtros: por estado, fecha, cliente
•	Paginación y ordenamiento
•	Manejo de errores con responses consistentes
ServiciosController
•	CRUD para servicios individuales
•	Validaciones específicas (fecha futura, etc.)
•	Relación con solicitud padre
2.4 Procedimiento Almacenado 
Crear sp_ProcesarSolicitudesPendientes y endpoint para ejecutarlo:
•	Marcar servicios vencidos
•	Cerrar solicitudes completadas
•	Retornar reporte de ejecución
PARTE 3: DESARROLLO FRONTEND
3.1 Arquitectura del Proyecto 
Estructura organizacional clara
3.2 Componentes Principales 
Lista de Solicitudes
•	Tabla/Grid con datos paginados
•	Filtros por estado, fecha, cliente
•	Acciones: Ver, Editar, Eliminar
•	Indicadores visuales de estado
Formulario de Solicitud
•	Campos de solicitud básicos
•	Gestión dinámica de servicios: 
o	Agregar/quitar servicios
o	Validación de fechas en tiempo real



o	Cálculo de totales (si aplica)
•	Validaciones
•	Estados de loading/error/success
Vista Detalle de Solicitud
•	Información completa de solicitud
•	Lista de servicios con estados
•	Opciones de edición según reglas de negocio

ENTREGABLES
Documentación Requerida
1.	Script de base de datos con estructura y datos de prueba
2.	Diagramas en formato imagen o herramienta online (Draw.io, Lucidchart)
3.	Decisiones técnicas y justificaciones (Opcional)

INSTRUCCIONES DE ENTREGA
•	Plazo: Viernes 30 de Mayo mas tardar 2:00 pm
•	Formato: ZIP al correo jsgiraldo@integral.com.co
•	Demo: Preparar demo de 15 minutos mostrando funcionalidades principales
•	Contacto: Para dudas técnicas jsgiraldo@integral.com.co
