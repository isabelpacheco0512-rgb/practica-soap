import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import soap from 'soap';
import { conversionesService } from '../services/conversiones.service.js';
import { geometriaService } from '../services/geometria.service.js';

const carpetaActual = path.dirname(fileURLToPath(import.meta.url));

function leerWsdl(nombreArchivo) {
  return fs.readFileSync(path.join(carpetaActual, '../wsdl', nombreArchivo), 'utf8');
}

export function registrarServiciosSoap(app) {
  soap.listen(app, '/soap/conversiones', conversionesService, leerWsdl('conversiones.wsdl'));
  soap.listen(app, '/soap/geometria', geometriaService, leerWsdl('geometria.wsdl'));
}