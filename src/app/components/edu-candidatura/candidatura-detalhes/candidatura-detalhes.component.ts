import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Pessoa } from './../../../models/pessoa';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Bolsa } from './../../../models/bolsa';
import { Constant } from 'src/app/models/Constant';
import { MatTableDataSource } from '@angular/material/table';
import { Candidatura } from 'src/app/models/candidatura';


@Component({
  selector: 'app-candidatura-detalhes',
  templateUrl: './candidatura-detalhes.component.html',
  styleUrls: ['./candidatura-detalhes.component.css']
})
export class CandidaturaDetalhesComponent implements OnInit {
  tiposContactos: Constant[];
  pessoa = new Pessoa();
  bolsa: Bolsa;
  etapa = 1;
  generos: Constant[];
  estadosCivis: Constant[];
  dataSource: MatTableDataSource<Candidatura>;

  tem_anexo = false;
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    const bolsa_id = this._Router.url.split('/').pop();
    this._AuthService.verifyUserLoged().subscribe(res => {
      if (!res) {
        this._Router.navigate(['/login/' + bolsa_id]);
      } else {
        this.carregarDadosPessoaLogada();
        this.carregarDadosBolsa(bolsa_id);
      }
    });
  }

  carregarDadosPessoaLogada() {
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
      .execute(
        "constants?tipo=tipos_contactos",
        GeneralConstants.CRUD_OPERATIONS.READ
      )
      .subscribe(res => {
        this.tiposContactos = res.data;
      });

    const user_id = this._AuthService.getUserId();
    this._GeneralService.execute(`pessoas/users/${user_id}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => {
        this.pessoa = res.data || this.pessoa;
        this.pessoa.formacoes = this.pessoa.formacoes || [];
        this.pessoa.contactos = this.pessoa.contactos || [];
 
     if (this.pessoa.anexo !== null)
          this.tem_anexo = true;  
      }
    ); 

  }

  carregarDadosBolsa(bolsa_id) {
    this._GeneralService.execute(`bolsas/${bolsa_id}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => {
        this.bolsa = res.data
      }
    );
  }




  getInfoCurso(candidatura: Candidatura) {
    return candidatura.candidatura_interna ? candidatura.candidatura_interna.curso.nome : candidatura.candidatura_externa.curso.nome;
  }

  getInfoInstituicao(candidatura: Candidatura) {
    let result = candidatura.candidatura_interna ? candidatura.candidatura_interna.curso.instituicao : candidatura.candidatura_externa.instituicao;
    if (result !== null)
      return (result.nome)
    else
      " Desconhecido";
  }


  getInfoGenero(code) {
   
    return this.generos.filter(e => e.code == code).pop().info;
  }

  getInfoEstadosCivis(code) {
    return this.estadosCivis.filter(e => e.code == code).pop().info;
  }
  getInfoTipoContacto(code) {
    const tipoContacto = this.tiposContactos.filter(tc => tc.code == code).pop();
    return tipoContacto ? tipoContacto.info : '';
  }
  getIdCandidatura(candidatura: Candidatura) {
    return candidatura.candidatura_interna ? candidatura.candidatura_interna.id : candidatura.candidatura_externa.id;
  }
  onNotify(pessoa: Pessoa): void {
    this.pessoa = pessoa;
  }
 
  verAnexo(anexo) {
    this._GeneralService.execute(`pessoas/${this.pessoa.id}/anexos/${anexo.id}/download`, GeneralConstants.CRUD_OPERATIONS.GET, null, '_blank').subscribe();
  }

  imprimirFicha(candidatura) {
    this._GeneralService.execute(`candidaturas/${candidatura.id}/ficha`, GeneralConstants.CRUD_OPERATIONS.GET, null, '_blank').subscribe();
  }

  imprimirFichaLinkExterno(candidatura) {
   
 }


}
