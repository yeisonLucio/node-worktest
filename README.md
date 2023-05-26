# node-worktest
Este proyecto cuenta con los siguientes servicios:
 * **transform**: Permite traducir modelos de la API https://swapi.dev/
 * **create-product**: Permite crear productos
 * **get-product**: Permite obtener un producto

Asi mismo utiliza una **DynamoDB** como base de datos y el modelo de datos utilizado es el siguiente:

  ```json
  {
    "id": "uuid",
    "name": "string",
    "reference": "string",
    "price": "number",
    "quantity": "number"
  }
  ```

La arquitectura utilizada es la siguiente:

![](arquitectura.png)

## Dependencias
  * nodejs

## Despliegue

  * En la raíz del proyecto ejecutar el comando **npm install**
  * Ejecutar el comando **npm run deploy**

## Consumo de los servicios
  * Luego de que los servicios fueron desplegados, importar en postman el archivo **node-testwork.postman_collection**  que se encuentra en la raíz del proyecto.
  * En postman crear una variable de entorno llamada **url_base** y asignar la url base que asigno serverless cuando se realizo el despliegue.
  