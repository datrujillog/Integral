# Backend - Prueba Técnica Integral S.A.

Este proyecto corresponde al backend de la prueba técnica para el cargo de Analista de Sistemas de Información. Implementa una API REST que permite la gestión de solicitudes de servicios de ingeniería, cumpliendo reglas de negocio específicas.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express** – Framework ligero para APIs REST.
- **PostgreSQL** – Base de datos relacional robusta y escalable.
- **Prisma ORM** – Mapeo objeto-relacional moderno, tipado y rápido.
- **Swagger** – Documentación interactiva de la API.
- **dotenv** – Configuración de variables de entorno.
- **CORS** – Control de accesos desde el frontend.

---

<!-- ## 📐 Estructura del Proyecto

src/
├── controllers/
├── routes/
├── services/ (si separamos lógica de negocio)
├── prisma/
│ └── schema.prisma
├── swagger.js
├── index.js -->


---

## 📋 Endpoints principales

> Documentación completa disponible en `http://localhost:3000/api-docs`

### Solicitudes

- `GET    /api/solicitudes` → Listar con filtros y paginación
- `GET    /api/solicitudes/:id` → Detalle
- `POST   /api/solicitudes` → Crear nueva
- `PUT    /api/solicitudes/:id` → Actualizar (si hay servicios pendientes)
- `DELETE /api/solicitudes/:id` → Eliminar (si ningún servicio está aprobado)
- `GET    /api/solicitudes/:id/servicios` → Obtener servicios de una solicitud
- `POST   /api/solicitudes/procesar-pendientes` → Marcar vencidos y cerrar solicitudes completadas

### Servicios

- `POST   /api/solicitudes/:id/servicios` → Agregar a solicitud
- `PUT    /api/servicios/:id` → Actualizar servicio
- `DELETE /api/servicios/:id` → Eliminar si está en estado pendiente

---

## 🧠 Decisiones Técnicas y Justificaciones

### 🔹 Node.js + Express

Se eligió por su rapidez de desarrollo, comunidad y facilidad de integración con Prisma y PostgreSQL. Además, Express permite mantener la API modular y clara.

### 🔹 PostgreSQL + Prisma

PostgreSQL ofrece integridad relacional y Prisma facilita validaciones automáticas, relaciones tipadas y migraciones limpias. Es ideal para un entorno de prueba técnica robusto y escalable.

### 🔹 Separación por capas

La lógica de negocio está organizada en controladores, dejando abierta la opción de extraerla a servicios para mayor escalabilidad.

### 🔹 Swagger

Permite documentar de manera interactiva la API, ideal para validaciones, pruebas y presentación al cliente.

### 🔹 Validaciones en capa de controlador

Se implementaron validaciones de negocio clave directamente en los endpoints:

- No modificar solicitudes si no tienen servicios pendientes.
- No eliminar si hay servicios aprobados.
- Fechas de reunión futuras.
- Validación de email.
- Cierre automático de solicitudes completadas y servicios vencidos.

---

## 📦 Scripts útiles

```bash
npm install         # Instalar dependencias
npx prisma migrate dev --name init   # Crear estructura en la DB
npm run dev         # Iniciar servidor (con nodemon)


🧪 Tests básicos sugeridos (manuales o Postman)
Crear solicitud con varios servicios

Marcar servicios vencidos por fecha

Cerrar solicitudes automáticamente

Probar reglas de modificación y eliminación

Consultar filtros combinados por cliente y fecha



✨ Autor
Diego Trujillo
Prueba técnica para Integral S.A.
Fecha: Mayo 2025
```
