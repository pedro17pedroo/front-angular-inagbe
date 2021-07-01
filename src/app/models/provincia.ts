import { Pais } from './pais';

export class Provincia {
  id: string;
  nome: string;
  sigla: string;
  pais : Pais;
  base_pais_id : string;
  codigo : string;
  provincia_abbr : string;
  highchart_code : string;
  estado : number;
}
