# Markeplace

Este proyecto consiste en una aplicación fullstack con backend en Node.js, frontend en Angular e integración con MercadoPago.

## 📋 Requisitos previos

Antes de comenzar, verifica que tengas instalado:

| Componente    | Versión Recomendada |
|--------------|-------------------|
| Node.js      | v18.x o superior   |
| Angular CLI  | v15.x o superior   |
| TypeScript   | v4.9.x o superior  |
| npm          | v9.x o superior    |

## 🛠️ Configuración del proyecto

### 1. Instalación de dependencias

Ejecuta los siguientes comandos en orden:
### Instalar dependencias del servidor backend
```bash

cd server && npm install && cd ..
``` 
### Instalar dependencias del cliente frontend
```bash
cd cliente && npm install && cd ..
``` 
### Instalar dependencias del servicio MercadoPago
```bash
cd mercadopago && npm install && cd ..
```
## Arrancar los servidores
Abre tres terminales diferentes para cada servicio:
Terminal 1 - Backend Principal
```bash

cd server
npm run dev        # Servidor API principal
``` 
Terminal 2 - Servicio de Imágenes
```bash

cd server
npm run imagen     # Servidor de manejo de imágenes
``` 
Terminal 3 - Integración MercadoPago
```bash
cd mercadopago
npm run dev        # Microservicio de pagos
``` 
Terminal 4 - Frontend Angular
```bash

cd cliente
ng serve           # Aplicación web (se abrirá en http://localhost:4200)
``` 
## Estructura del proyecto

<pre>
project-root/
├── <b>server/</b>        # Backend principal (API REST)
│   ├── src/       # Código fuente
│   └── .env       # Variables de entorno
├── <b>cliente/</b>       # Frontend Angular
│   ├── src/       # Código fuente
│   └── .env       # Variables de entorno
└── <b>mercadopago/</b>   # Servicio de pagos
    ├── src/       # Código fuente
    └── .env       # Variables de entorno
</pre>
