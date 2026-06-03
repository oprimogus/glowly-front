# Estágio de construção (Build)
FROM node:20-alpine AS build

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci

# Copiar o restante do código
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Estágio de produção (Serve)
FROM nginx:stable-alpine

# Copiar os arquivos construídos do estágio anterior
# O Vite por padrão coloca os arquivos na pasta 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para lidar com roteamento do React (SPA)
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
