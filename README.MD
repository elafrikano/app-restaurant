# App-Restaurant

## Descripción

Aplicación destinada a la búsqueda de restaurantes cercanos a partir de la ubicación del usuario.

## Justificacion

Decidí usar un stack MERN para realizar la aplicación ya que integrar Mongo y JavaScript es super sencillo con la ayuda de mongoose, Express me permitió crear una infraestructura sólida para la app, con el maneje todo el Backend con Node y por último React permitió desarrollar el Frontend de manera limpia, organizada.

## Pasos para ejecutar la app

- Tener una version de node superior a la 12.6.1
- Tener mongodb instalada
- Abrir una consola y pararse sobre el directorio raiz de la app

### Web

- Ejecutar `cd web && npm install && npm start`

### Api

- Crear un archivo .env tomando como referencia el archivo example.env
- Ejecutar `cd api && npm install && npm run dev`

## Puntos no incluidos

- Punto Opcional: Disponibilizar un endpoint que modifique el tiempo X (definido en la sección de
  Búsqueda) ​de ​forma ​que ​sea ​una ​configuración ​dinámica.
- Explicacion: Para el mismo mi idea era crear un documento en mongodb llamado configuración en donde se incluiria todo lo que tendria que ver con la configuracion dinamica de la app. Tendria que haber creado un endpoint para devolver la configuracion en incluirla en el modulo search de la web y hubiera creado otro para modificar o crear el mismo.
