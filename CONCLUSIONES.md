# Conclusiones

## SOAP y el sobre XML

SOAP permite que diferentes aplicaciones se comuniquen mediante mensajes estructurados. En la práctica, pude ver cómo los mensajes XML utilizan el `Envelope` y el `Body` para organizar la información que se envía y recibe. Esto ayuda a que las aplicaciones puedan intercambiar datos de una forma ordenada.

## WSDL

El WSDL sirve para describir cómo funciona un servicio web, qué operaciones tiene, qué datos necesita y a qué dirección se puede acceder. Al revisar mis dos archivos WSDL, pude entender que funcionan como una guía para que otras aplicaciones utilicen el servicio sin necesidad de conocer cómo está programado internamente.

## Consultar un WSDL vs. invocar una operación

Aprendí que consultar un WSDL no es lo mismo que ejecutar una operación. Cuando se utiliza `GET ...?wsdl`, se obtiene información sobre el servicio; en cambio, con las peticiones `POST` se ejecutan las operaciones. Esto se pudo observar en los registros de las peticiones que realicé.

## El Router

Separar las rutas ayuda a mantener el código más organizado, especialmente cuando una aplicación tiene varios servicios. En mi práctica, `app.js` quedó encargado de la configuración, mientras que el archivo de rutas registra los servicios. Aunque no utilicé directamente un `express.Router()`, sí separé esa parte para facilitar su mantenimiento.

## El middleware de registro

El middleware permite registrar las peticiones desde un solo lugar, sin tener que repetir el mismo código en cada operación. En mi práctica, el registro me permitió observar tanto las consultas al WSDL como las peticiones a las operaciones, haciendo más sencillo revisar qué estaba pasando en el servicio.

## SOAP con WSDL vs. REST con JSON

Considero que SOAP con WSDL es útil cuando se necesita definir un contrato más estricto entre aplicaciones, por ejemplo, en sistemas bancarios. Por otro lado, REST con JSON puede ser más sencillo para desarrollar una API para una aplicación móvil, porque permite intercambiar información de manera más ligera y con menos estructura.
