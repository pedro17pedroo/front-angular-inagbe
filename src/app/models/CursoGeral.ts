import { AreaConhecimento } from './AreaConhecimento';

export class CursoGeral {
  id: string;
  nome: string;
  codigo : string;
  estado : number;
  sigla : string;
  areaConhecimento : AreaConhecimento;
  base_area_conhecimentos_id : string;
}
