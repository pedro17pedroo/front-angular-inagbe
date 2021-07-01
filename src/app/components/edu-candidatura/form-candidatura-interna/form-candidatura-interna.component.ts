import { Component, OnInit, Input } from '@angular/core';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { CursoGeral } from 'src/app/models/CursoGeral';
import { Instituicao } from 'src/app/models/instituicao';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Bolsa } from './../../../models/bolsa';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from './../../../models/pessoa';
import { Curso } from 'src/app/models/curso';
import { Constant } from './../../../models/Constant';
import { Candidatura } from 'src/app/models/candidatura';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-candidatura-interna',
  templateUrl: './form-candidatura-interna.component.html',
  styleUrls: ['./form-candidatura-interna.component.css']
})
export class FormCandidaturaInternaComponent implements OnInit {
  candidatura = new Candidatura();
  @Input() pessoa: Pessoa;
  @Input() bolsa: Bolsa;
  paises: Pais[];
  provincias: Provincia[];
  cursosgerais: CursoGeral[];
  cursos: Curso[];
  instituicoes: Instituicao[];
  pais_id: string;
  provincia_id: string;
  base_curso_id: string;
  edu_curso_id: string;
  instituicao_id: string;
  ano_ingresso: string;
  frequencia: string;
  media: string;
  isExterna = false;
  jaPossuiCandidatura = false;
  estados_candidaturas: Constant[];
  candidatura_editar: any;
  displayedColumns: string[] = ['curso', 'instituicao', 'situacao', 'accao'];
  dataSource: MatTableDataSource<Candidatura>;
  uploadedFiles = [];
  tipos_anexos: any = [];

  constructor(private _GeneralService: GeneralService,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService) { }

  ngOnInit(): void {
    this.popularDados();
  }

  adicionarCandidatura() {

    let candidatura_externa_id = null;
    let candidatura_interna_id = null;
    let id = null;

    console.log(this.candidatura_editar);

    if (this.candidatura_editar) {
      id = this.candidatura_editar.id;
      if (this.candidatura_editar.candidatura_externa)
        candidatura_externa_id = this.candidatura_editar.candidatura_externa.id;

      if (this.candidatura_editar.candidatura_interna)
        candidatura_interna_id = this.candidatura_editar.candidatura_interna.id;

    }
    const candidatura = {
      base_pessoa_id: this.pessoa.id,
      edu_bolsa_id: this.bolsa.id,
      base_curso_id: this.base_curso_id,
      edu_curso_id: this.edu_curso_id,
      edu_instituicao_id: this.instituicao_id,
      id: id,
      candidatura_interna_id: candidatura_interna_id,
      candidatura_externa_id: candidatura_externa_id,
      ano_ingresso: this.ano_ingresso,
      frequencia: this.frequencia,
      media: this.media
    }
    console.log("-----------------------------------------------------------------")
    console.log(candidatura)
    console.log("-----------------------------------------------------------------")
    let curso_exist = false;
    if (candidatura.base_curso_id)
      curso_exist = true;
    if (candidatura.edu_curso_id)
      curso_exist = true;

    if (curso_exist) { 
      this._GeneralService.execute('candidaturas', GeneralConstants.CRUD_OPERATIONS.INSERT, candidatura).subscribe(
        res => {
          if (res.data) {
            this.pessoa.candidaturas.push(res.data);
            this.actualizarTabela();
          }
        }
      );
    }
    else {
      this.toasterService.error("Deve Selecionar o Curso ", 'Atenção'); 
    }
 
  }
  editarCandidatura(candidatura) {
    this.jaPossuiCandidatura = false;
    this.candidatura_editar = candidatura;
    const candidaturaObject = this.pessoa.candidaturas
      .filter((c: any) => candidatura.id && c.id == candidatura.id)
      .pop();
    if (candidaturaObject) {
      this.candidatura = { ...candidaturaObject };
      this.changePais(this.candidatura);
    }
  }

  actualizarTabela() {
    this.dataSource = new MatTableDataSource<Candidatura>(this.pessoa.candidaturas);
    this.jaPossuiCandidatura = this.pessoa.candidaturas.filter(c => c.edu_bolsa_id == this.bolsa.id).pop() != null;
  }

  cancelarCandidatura(candidatura) {
    this._GeneralService.execute('candidaturas', GeneralConstants.CRUD_OPERATIONS.DELETE, candidatura).subscribe(
      res => {
        // this.pessoa.candidaturas.push(res.data);
        this.actualizarTabela();
      }
    );
  }

  popularDados() {
    this._GeneralService
      .execute("tiposanexos?categoria=3", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.tipos_anexos = res.data;
      });
    if (this.bolsa.tipo == GeneralConstants.TIPOS_BOLSAS.EXTERNA.code) {
      this.isExterna = true;
      this._GeneralService
        .execute(`cursosgeraisespecificos/${this.bolsa.id}`, GeneralConstants.CRUD_OPERATIONS.READ)

        .subscribe(res => {
          this.cursosgerais = res.data;
        });
    }

    this._GeneralService
      .execute("constants?tipo=estados_candidaturas", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.estados_candidaturas = res.data;
        this.actualizarTabela();
      });

    if (this.jaPossuiCandidatura) {
      return;
    }

    this._GeneralService
      .execute("paisesactivo", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.paises = res.data;
      });
  }

  changePais(candidatura?: Candidatura) {
    if (candidatura) {
      this.pais_id = candidatura.instituicao.provincia.base_pais_id;
    }

    if (!this.pais_id) {
      this.provincias = [];
      return;
    }

    this._GeneralService
      .execute(
        `paises/${this.pais_id}/provincias`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.provincias = res.data;
        this.changeProvincia(candidatura);
      });
  }



  changeProvincia(candidatura?: Candidatura) {
    if (candidatura) {
      this.provincia_id = candidatura.instituicao.provincia.id;
    }

    if (!this.provincia_id) {
      return;
    }

    this._GeneralService
      .execute(
        `provincias/${this.provincia_id}/instituicoes`, GeneralConstants.CRUD_OPERATIONS.READ,
        //  `provincias/${this.provincia_id}/instituicoes?nivel_academico=${this.candidatura.nivel_academico}`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.instituicoes = res.data;
      });
  }


  changeInstituicao() {
    if (this.isExterna) {
      return;
    }

    console
    this._GeneralService
      .execute(`instituicoes/${this.instituicao_id}/cursos`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.cursos = res.data;
      });
  }

  getInfoCurso(candidatura: Candidatura) {
    return candidatura.candidatura_interna ? candidatura.candidatura_interna.curso.nome : candidatura.candidatura_externa.curso.nome;
  }

  getInfoInstituicao(candidatura: Candidatura) {
    return candidatura.candidatura_interna ? candidatura.candidatura_interna.curso.instituicao.nome : candidatura.candidatura_externa.instituicao.nome;
  }

  getEstadoInfo(code) {
    return this.estados_candidaturas.filter(e => e.code == code).pop().info;
  }
  getIdCandidatura(candidatura: Candidatura) {
    return candidatura.candidatura_interna ? candidatura.candidatura_interna.id : candidatura.candidatura_externa.id;
  }

  imprimirFicha(candidatura) {
    this._GeneralService.execute(`candidaturas/${candidatura.id}/ficha`, GeneralConstants.CRUD_OPERATIONS.GET, null, '_blank').subscribe();
  }


  imprimirFichaLinkExterno(candidatura) {

  }

}
