# Vuejs Cards Manager

## Description
Test application to verify competences in the development using Vue and Vuetify technologies. In addition to testing the Firebase hosting service for SPA applications.

The definition of this project was taken from a challenge requested during the selection process in a company.

It's deployed in [Card manager](https://apinto-vue-card-manager.firebaseapp.com/)

## Definition
Queremos crear una sencilla aplicación en js/react que nos permita añadir, editar o eliminar “tarjetas” con una información muy básica (título, descripción e imagen). Dicha aplicación ha de cumplir los siguientes requisitos:
* Botón que muestra un modal con un sencillo formulario para introducir los datos de la nueva tarjeta:
    * Título (obligatorio)
    * Descripción (obligatorio)
    * Imagen (opcional y solamente la url, no es necesario que permita subir imágenes)
* Cada tarjeta a mostrar ha de visualizar la imagen en la parte superior, en caso de no haber indicado ninguna, ha de mostrar una imagen predeterminada por nosotros, justo debajo el título y descripción y al pasar el ratón sobre la tarjeta ha de mostrar unos botones que permitan editar o borrar la etiqueta.
* Tal como vayamos añadiendo tarjetas se han de ir visualizando directamente en la aplicación.

Extras:
* Almacenar las tarjetas en localstorage para que no se pierdan si cerramos o recargamos la aplicación.
* Añadir botones que nos permitan ordenar las tarjetas por título asc/desc o bien por creación asc/desc
* Que se visualice correctamente en mobile y desktop.

Nota:

Además del correcto funcionamiento, se valorará la calidad y legibilidad del código, la estructura de ficheros, así como las pruebas unitarias realizadas.

## Getting Started

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Deploy in firebase hosting
```
npm run firebase-deploy
```
