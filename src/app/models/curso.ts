import { CursoGeral } from './CursoGeral';
import { Instituicao } from 'src/app/models/instituicao';

export class Curso {
  id: string;
  nome: string;
  codigo : string;
  estado : number;
  nivelAcademico : number;
  cursoGeral : CursoGeral;
  base_curso_geral_id : string;
  base_curso_id : string;
  nivel_academico : string;
  instituicao : Instituicao;
}
