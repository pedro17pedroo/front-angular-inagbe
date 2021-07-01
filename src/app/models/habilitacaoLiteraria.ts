import { Instituicao } from './instituicao';

export class HabilitacaoLiteraria {
  id?: string;
  base_pessoa_id : string;
  edu_instituicao_id : string;;
  base_curso_id: string;
  media: number;
  ano_ingresso : number;
  ano_conclusao : number;
  nivel_academico : number;
  instituicao : Instituicao;
  file : string;
}
