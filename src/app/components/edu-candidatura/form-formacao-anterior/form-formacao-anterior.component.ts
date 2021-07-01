import { Component, OnInit, Input } from "@angular/core";
import { GeneralService } from "src/app/services/general.service";
import { GeneralConstants } from "src/app/constants/GeneralConstants";
import { Pessoa } from "./../../../models/pessoa";
import { Pais } from "./../../../models/pais";
import { Provincia } from "./../../../models/provincia";
import { Instituicao } from "./../../../models/instituicao";
import { Constant } from "./../../../models/Constant";
import { CursoGeral } from "./../../../models/CursoGeral";
import { HabilitacaoLiteraria } from "src/app/models/habilitacaoLiteraria";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-form-formacao-anterior",
  templateUrl: "./form-formacao-anterior.component.html",
  styleUrls: ["./form-formacao-anterior.component.css"]
})
export class FormFormacaoAnteriorComponent implements OnInit {
  formacao = new HabilitacaoLiteraria();
  pais_id: string;
  provincia_id: string;
  instituicao_id: number;
  curso_id: number;
  nivelAcademico: number;
  @Input() pessoa: Pessoa;
  paises: Pais[];
  provincias: Provincia[];
  cursosgerais: CursoGeral[];
  instituicoes: Instituicao[];
  niveisAcademicos: Constant[];

  displayedColumns: string[] = [
    "curso",
    "nivel_academico",
    "ano_ingresso",
    "ano_conclusao",
    "accao"
  ];
  dataSource: MatTableDataSource<HabilitacaoLiteraria>;

  uploadedFiles  = [];
  tipos_anexos : any = [];

  constructor(private _GeneralService: GeneralService) {}

  ngOnInit(): void {
    this.popularDados();
  }

  fileChange(element, tipoAnexo : string) {
    this.uploadedFiles.push({tipoAnexo : tipoAnexo, files : element.target.files});
}

  actualizarTabela() {
    this.dataSource = new MatTableDataSource<HabilitacaoLiteraria>(
      this.pessoa.formacoes
    );
  }

  popularDados() {
    this._GeneralService
    .execute("tiposanexos?categoria=2", GeneralConstants.CRUD_OPERATIONS.READ)
    .subscribe(res => {
      this.tipos_anexos = res.data;
    });
    this._GeneralService
      .execute(
        "constants?tipo=niveis_academicos",
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.niveisAcademicos = res.data;
      });

    this._GeneralService
      .execute("cursosgerais", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.cursosgerais = res.data;
        this.actualizarTabela();
      });

    this._GeneralService
      .execute("paises", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.paises = res.data;
      });
  }

  changePais(formacao?: HabilitacaoLiteraria) {
    if (formacao) {
      this.pais_id = formacao.instituicao.provincia.base_pais_id;
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
        this.changeProvincia(formacao);
      });
  }

  changeProvincia(formacao?: HabilitacaoLiteraria) {
    if (formacao) {
      this.provincia_id = formacao.instituicao.provincia.id;
    }

    if (!this.provincia_id) {
      return;
    }

    this._GeneralService
      .execute(
        `provincias/${this.provincia_id}/instituicoes?nivel_academico=${this.formacao.nivel_academico}`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.instituicoes = res.data;
      });
  }

  
  changeNivelAcademico(formacao?: HabilitacaoLiteraria) {
    if (formacao) {
      this.provincia_id = formacao.instituicao.provincia.id;
    }

    if (!this.provincia_id) {
      return;
    }

    this._GeneralService
      .execute(
        `provincias/${this.provincia_id}/instituicoes?nivel_academico=${this.formacao.nivel_academico}`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.instituicoes = res.data;
      });
  }

  activarBtnAddFormacao() {
    return (
      (this.formacao.edu_instituicao_id == "0" ||
        this.formacao.edu_instituicao_id) &&
      this.formacao.media
    );
  }

  adicionarFormacao() {
  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
    for (var j = 0; j < this.uploadedFiles[i].files.length; j++) {
      formData.append(`uploads_${this.uploadedFiles[i].tipoAnexo}[]`, this.uploadedFiles[i].files[j], this.uploadedFiles[i].files[j].name);
  } 
  this.actualizarTabela() ;
}

console.log(this.formacao);
const properties = Object.keys(this.formacao);
const values = Object.values(this.formacao);

properties.forEach((prop , i)=>{
  formData.append(prop, values[i]);
})

    this._GeneralService
      .execute(
        `pessoas/${this.pessoa.id}/formacoes`,
        GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE,
        formData
      )
      .subscribe(res => {
        if (res.data) {
          this.actualizaListaFormacoes(res.data);
          this.formacao = new HabilitacaoLiteraria();
        }
      });
  }

  actualizaListaFormacoes(formacao) {
    this.pessoa.formacoes = this.pessoa.formacoes.filter(
      (c: any) => c.id && c.id != formacao.id
    );

    this.pessoa.formacoes.push({ ...formacao });
    this.actualizarTabela();
  }

  removerFormacao(formacao) {
    this._GeneralService.execute(`pessoas/${this.pessoa.id}/formacoes/${formacao.id}`, GeneralConstants.CRUD_OPERATIONS.DELETE).subscribe(
      res =>{
        this.pessoa.formacoes = this.pessoa.formacoes.filter(
          (c: any) => formacao.id && c.id != formacao.id
        );
        this.actualizarTabela();
      }
    )
  }

  editarFormacao(formacao) {
    const formacaoObject = this.pessoa.formacoes
      .filter((c: any) => formacao.id && c.id == formacao.id)
      .pop();
    if (formacaoObject) {
      this.formacao = { ...formacaoObject };
      this.changePais(this.formacao);
    }
  }

  getInfoCurso(id) {
    const curso = this.cursosgerais.filter(tc => tc.id == id).pop();
    return curso ? curso.nome : "";
  }

  getInfoNivelAcademico(code) {
    const constante = this.niveisAcademicos.filter(tc => tc.code == code).pop();
    return constante ? constante.info : "";
  }
}
