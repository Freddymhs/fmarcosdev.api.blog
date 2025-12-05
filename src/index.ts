// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    // Quick checklist for Railway deploys (gateway + Strapi)
    console.log(`\nChecklist Railway/Strapi:\n
  - Variables: APP_KEYS, ADMIN_JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY cargadas.\n  - DB: DATABASE_CLIENT=sqlite (datos efímeros) o define DATABASE_URL/credenciales para Postgres.\n  - CMS_URL (con http/https) y opcional CMS_TOKEN configurados en el gateway.\n  - Content type: Article con campos title (string) y content (richtext) creado/publicado.\n  - Permisos: rol Public con find/findOne en Article (y create si lo necesitas) o usa CMS_TOKEN.\n  - Hay artículos publicados.\n  - CORS_ORIGIN en gateway apunta al frontend.\n  - Prueba directa: curl https://<tu-cms>.up.railway.app/api/articles [Authorization: Bearer <token>]\n`);
  },
};
