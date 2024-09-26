# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/ .

# Exponemos el puerto 3000 para Next.js
EXPOSE 3000

# Comando para correr la aplicación en producción
CMD ["npm", "start"]
