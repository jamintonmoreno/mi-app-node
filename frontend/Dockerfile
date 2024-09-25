# Usa una imagen base ligera de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/frontend

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código del proyecto al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto 3001 (en lugar del 3000)
EXPOSE 3001

# Comando por defecto para iniciar el servidor Next.js
CMD ["npm", "start"]
