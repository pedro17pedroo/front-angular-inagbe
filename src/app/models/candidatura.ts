
import { Bolsa } from 'src/app/models/bolsa';
import { Curso } from './curso';
import { Instituicao } from 'src/app/models/instituicao';
export class Candidatura {
    id: number;
    pessoa_id: string;
    base_nivel_academico_id: number;
    base_anexo_id: number;
    edu_instituicao_id:number;
    edu_bolsa_id: string;
    base_curso_id: string;
    edu_curso_id: string;
    bolsa: Bolsa;
    curso : Curso;
    instituicao : Instituicao;
    candidatura_interna : Candidatura;
    candidatura_externa : Candidatura
}
