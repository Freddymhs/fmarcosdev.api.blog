Blog Migration Tool (Resumen)

Coloca todos tus .md en source/ y mueve a ready/ solo los que quieras subir.
Arranca servidor Strapi en http://localhost:1337.

Luego ejecuta la migración:

npm run migrate

El script toma el título del nombre de archivo y el contenido completo del markdown.

- Asegúrate de que en Strapi exista el tipo Article con Title y richContent.
- Tras subir, vacía ready/ para evitar duplicados.
- Configura la URL de Strapi en migrate-blogs.js si es necesario. (docker maybe)
