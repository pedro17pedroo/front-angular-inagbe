import { Anexo_item } from './anexo_item';

export class Anexo {
    id: number;
    nome: string;
    estado: string;
    itens: Anexo_item[];
}