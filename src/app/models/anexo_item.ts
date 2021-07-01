import { TipoAnexo } from './TipoAnexo';

export class Anexo_item {
    id: number;
    nome: string;
    base_anexo_id: number;
    base_tipo_anexo_id: number;
    ficheiro: File;
    tipo_anexo:TipoAnexo[];
}