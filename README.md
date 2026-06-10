# CineWave 🎬

Frontend de la aplicación **CineWave**, una plataforma personal para gestionar tu colección de películas y series. Desarrollada en Angular 19 con diseño Y2K.

## Tecnologías

- Angular 19 (Standalone Components)
- TypeScript
- SCSS
- Angular Router (Lazy Loading)
- HttpClient
- Signals

## Requisitos

- Node.js 18+
- Angular CLI

## Instalación

```bash
npm install
```

## Desarrollo

```bash
ng serve
```

Abre `http://localhost:4200/` en el navegador.

## Build

```bash
ng build
```

## Estructura del proyecto
- src/app/
- features/
- auth/          → Login y registro
- films/         → Gestión de películas y series
- actors/        → Catálogo de actores
- directors/     → Catálogo de directores
- genres/        → Catálogo de géneros
- lists/         → Listas personalizadas
- shared/
- services/      → Session (manejo de token JWT)

## Funcionalidades

- Registro e inicio de sesión con JWT
- Agregar, editar y eliminar películas y series
- Calificar con estrellas y agregar reseña
- Filtrar por tipo (película/serie) y estado (pendiente/vista)
- Crear listas personalizadas y agregar películas a ellas
- Catálogo de actores, directores y géneros

## Backend

API REST desplegada en Render:
`https://filmapp-ecz6.onrender.com/api/v1`

Documentación Swagger:
`https://filmapp-ecz6.onrender.com/api/docs`