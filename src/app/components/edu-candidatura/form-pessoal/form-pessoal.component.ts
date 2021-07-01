import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Constant } from "./../../../models/Constant";
import { GeneralService } from "./../../../services/general.service";
import { GeneralConstants } from "./../../../constants/GeneralConstants";
import { Pessoa } from "./../../../models/pessoa";
import { Provincia } from "./../../../models/provincia";
import { Municipio } from "./../../../models/municipio";
import { Pais } from "src/app/models/pais";

@Component({
  selector: "app-form-pessoal",
  templateUrl: "./form-pessoal.component.html",
  styleUrls: ["./form-pessoal.component.css"]
})
export class FormPessoalComponent implements OnInit {
  @Input() pessoa: Pessoa;

  paises: Pais[];
  provincias: Provincia[];
  provinciasResidencia: Provincia[];
  municipios: Municipio[];
  municipiosResidencia: Municipio[];
  generos: Constant[];
  estadosCivis: Constant[];

  base_provincia_id: string;
  pais_residencia_id: string;
  provincia_residencia_id: string;

  dataNascimentoMax = new Date();
  dataEmissaoMax = new Date();

  constructor(private _GeneralService: GeneralService) {


  }

  ngOnInit(): void {
    this.popularDados();
  }



  popularDados() {
    this._GeneralService
      .execute("constants?tipo=generos", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.generos = res.data;
      });
    this._GeneralService
      .execute(
        "constants?tipo=estados_civis",
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.estadosCivis = res.data;
      });

    this._GeneralService
      .execute("paises", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.paises = res.data;
      });

    this._GeneralService
      .execute("provincias", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.provincias = res.data;
      });

    this._GeneralService
      .execute("municipios", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.municipios = res.data;
        this.carregarNaturalidadeDefault();
        this.changePaisResidencia();
      });
  }

  carregarNaturalidadeDefault() {
    if (this.pessoa.base_municipio_id) {
      const municipioPreSelect = this.municipios
        .filter(m => m.id == this.pessoa.base_municipio_id)
        .pop();
      if (municipioPreSelect) {
        const provinciaPreSelect = this.provincias
          .filter(p => p.id == municipioPreSelect.base_provincia_id)
          .pop();
        if (provinciaPreSelect) {
          this.base_provincia_id = provinciaPreSelect.id;
        }
      }
    }
  }

  changePaisResidencia() {
    if(!this.pessoa.municipio_residencia.provincia.base_pais_id){
      this.provinciasResidencia = [];
      return;
    }
    this._GeneralService
      .execute(
        `paises/${this.pessoa.municipio_residencia.provincia.base_pais_id}/provincias`,
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.provinciasResidencia = res.data;
        this.changeProvinciaResidencia();
      });
  }

  changeProvincia(){

   if (!this.pessoa.municipio.provincia.id){
      this.municipios = [];
      return;
    }   
    this._GeneralService
    .execute(
      `provincias/${this.pessoa.municipio.provincia.id}/municipios`,
      GeneralConstants.CRUD_OPERATIONS.READ )
    .subscribe(res => {
    this.municipios = res.data;
    });
  }

  changeProvinciaResidencia(){
    if (!this.pessoa.municipio_residencia.provincia.id){
      this.municipiosResidencia = [];
      return;
    }

    this._GeneralService
    .execute(
      `provincias/${this.pessoa.municipio_residencia.provincia.id}/municipios`,
      GeneralConstants.CRUD_OPERATIONS.READ
    )
    .subscribe(res => {
      this.municipiosResidencia = res.data;
    });
  }



}
