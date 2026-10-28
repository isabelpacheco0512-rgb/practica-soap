# Práctica: Servicios web SOAP con Express y WSDL

Aplicación con Node.js y Express que expone dos servicios web SOAP, cada uno con su propio contrato WSDL y dos operaciones. Las peticiones y respuestas viajan como sobres SOAP en XML.

## Requisitos

- Node.js 18 o superior
- npm
- Postman, SoapUI o curl (para las pruebas)

## Instalación

```bash
git clone <URL-del-repositorio>
cd practica-soap
npm install
```

## Ejecución

```bash
npm start
```

El servidor queda escuchando en `http://localhost:3000`. Para apagarlo, pulsa `Ctrl + C`.

## Endpoints y contratos WSDL

| Servicio | Endpoint | WSDL | Operaciones |
|---|---|---|---|
| ConversionesService | `http://localhost:3000/soap/conversiones` | `http://localhost:3000/soap/conversiones?wsdl` | CelsiusAFahrenheit, KilometrosAMillas |
| GeometriaService | `http://localhost:3000/soap/geometria` | `http://localhost:3000/soap/geometria?wsdl` | AreaRectangulo, PerimetroRectangulo |

## Estructura del proyecto

```
server.js                          Arranque del servidor
src/app.js                         Configuración general de Express
src/routes/soap.routes.js          Registro de los dos servicios SOAP
src/middleware/logger.js           Middleware de registro de peticiones
src/services/                      Lógica de cada servicio
src/wsdl/                          Contratos WSDL
requests/                          Peticiones XML de prueba
evidencias/                        Capturas de las pruebas
```

## Middleware de registro

`src/middleware/logger.js` se ejecuta antes de las rutas SOAP y escribe en la terminal una línea por petición con el método, la URL, el código de estado y el tiempo de procesamiento. No modifica el XML de la petición ni de la respuesta.

Ejemplo:

```
GET /soap/conversiones?wsdl -> 200 (4 ms)
POST /soap/conversiones -> 200 (14 ms)
```

## Pruebas

### 1. Consultar los contratos WSDL

Con el servidor en ejecución, abre en el navegador:

- `http://localhost:3000/soap/conversiones?wsdl`
- `http://localhost:3000/soap/geometria?wsdl`

Cada contrato debe mostrar sus dos operaciones y, al final, la dirección de su propio servicio.

### 2. Invocar las operaciones

Cada petición se envía por `POST` con el encabezado `Content-Type: text/xml; charset=utf-8` y el encabezado `SOAPAction` de la operación. Los cuerpos están en la carpeta `requests/`.

| Operación | URL | SOAPAction | Cuerpo | Caso de prueba | Resultado esperado |
|---|---|---|---|---|---|
| CelsiusAFahrenheit | `/soap/conversiones` | `CelsiusAFahrenheit` | `requests/celsius-a-fahrenheit.xml` | 25 °C | 77 |
| KilometrosAMillas | `/soap/conversiones` | `KilometrosAMillas` | `requests/kilometros-a-millas.xml` | 10 km | 6.21371 |
| AreaRectangulo | `/soap/geometria` | `AreaRectangulo` | `requests/area-rectangulo.xml` | base 8, altura 5 | 40 |
| PerimetroRectangulo | `/soap/geometria` | `PerimetroRectangulo` | `requests/perimetro-rectangulo.xml` | base 8, altura 5 | 26 |

#### Con Postman

1. Crea una petición `POST` con la URL de la operación.
2. En **Headers**, agrega `Content-Type: text/xml; charset=utf-8` y `SOAPAction` con el valor de la tabla.
3. En **Body**, elige **raw** y **XML**, y pega el contenido del archivo correspondiente.
4. Pulsa **Send**. La respuesta debe ser un sobre SOAP en XML con el resultado esperado.

#### Con curl (PowerShell)

```powershell
curl.exe -X POST http://localhost:3000/soap/conversiones -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: CelsiusAFahrenheit" --data-binary "@requests/celsius-a-fahrenheit.xml"

curl.exe -X POST http://localhost:3000/soap/conversiones -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: KilometrosAMillas" --data-binary "@requests/kilometros-a-millas.xml"

curl.exe -X POST http://localhost:3000/soap/geometria -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: AreaRectangulo" --data-binary "@requests/area-rectangulo.xml"

curl.exe -X POST http://localhost:3000/soap/geometria -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: PerimetroRectangulo" --data-binary "@requests/perimetro-rectangulo.xml"
```

En Linux o macOS usa `curl` en lugar de `curl.exe`.

## Evidencias

La carpeta `evidencias/` contiene las capturas de:

- Los dos contratos WSDL (`wsdl-conversiones.png`, `wsdl-geometria.png`)
- Las cuatro respuestas SOAP (`respuesta-*.png`)
- El registro del middleware durante las pruebas (`log-middleware.png`)

## Notas de diseño

Los servicios se publican con la biblioteca `soap` (node-soap). El archivo `src/routes/soap.routes.js` exporta una función que registra los dos servicios en sus endpoints, y `src/app.js` solo la invoca junto con la configuración general (logger y body-parser). El archivo principal no contiene la lógica de las operaciones ni los contratos.