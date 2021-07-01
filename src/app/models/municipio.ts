import { Provincia } from './provincia';

export class Municipio {
  id: string;
  nome: string;
  provincia  = new Provincia();
  base_provincia_id : string;
  codigo : string;
  sigla : string;
  estado : number;
}
