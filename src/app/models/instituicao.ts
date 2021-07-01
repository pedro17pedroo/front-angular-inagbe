import { Curso } from './curso';
import { Provincia } from './provincia';

export class Instituicao {
  id: string;
  nome: string;
  codigo : string;
  estado : number;
  cursos : Curso[];
  provincia : Provincia;
}
