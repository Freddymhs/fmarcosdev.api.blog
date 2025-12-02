# fmarcosdev.api.blog

Microservicio CMS para gestionar contenido del blog (artículos, FAQs, etc.).

## Stack

- **Runtime**: Node.js 18+
- **CMS**: Strapi 5
- **Base de datos**: SQLite (desarrollo), PostgreSQL (producción)
- **Autenticación**: Strapi Users & Permissions plugin

## Responsabilidades

- **Gestionar contenido**: Crear, editar y publicar artículos desde panel admin
- **Exponer API**: Endpoints protegidos para consumidores autenticados (`/api/articles`, etc.)
- **Autenticar acceso**: Strapi valida tokens JWT/API en todas las peticiones

## Acceso

### Panel Admin
```
http://localhost:1337/admin
```
Solo para editar contenido. Requiere usuario y contraseña.

### API Endpoints
```
GET /api/articles
Authorization: Bearer <your-jwt-token>
```

**Nota**: Todos los endpoints de API requieren autenticación. Strapi lo gestiona automáticamente.

## Desarrollo

### Localmente (sin Docker)
```bash
npm install
npm run dev
# Acceder a http://localhost:1337/admin
```

### Con Docker
```bash
npm run dev:docker:build  # Primera vez
npm run dev:docker       # Inicia servicio
npm run dev:docker:down  # Detener
```

## Obtener Token API

1. Acceder a `http://localhost:1337/admin`
2. Ir a Configuración → API Tokens
3. Crear nuevo token (copiar y guardar en variable de entorno)
4. Usar en peticiones:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/articles
   ```

## Próximos pasos

- [ ] Migrar a PostgreSQL para producción
- [ ] Configurar rate limiting en endpoints públicos
- [ ] Documentar esquema de artículos (schema GraphQL/OpenAPI)
