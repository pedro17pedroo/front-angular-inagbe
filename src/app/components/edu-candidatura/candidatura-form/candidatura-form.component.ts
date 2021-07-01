import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Pessoa } from './../../../models/pessoa';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Bolsa } from './../../../models/bolsa';

@Component({
  selector: 'app-candidatura-form',
  templateUrl: './candidatura-form.component.html',
  styleUrls: ['./candidatura-form.component.css']
})
export class CandidaturaFormComponent implements OnInit {

  pessoa = new Pessoa();
  bolsa: Bolsa;
  bolsa_id ="0";
  etapa = 1;

  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    const bolsa_id = this._Router.url.split('/').pop();
    this.bolsa_id =bolsa_id;
    this._AuthService.verifyUserLoged().subscribe(res => {
      if (!res) {
        this._Router.navigate(['/login/' + bolsa_id]);
      } else { 
        this.carregarDadosBolsa(this.bolsa_id);
 
      }
    });
  }

  carregarDadosPessoaLogada(bolsa_id) {
    const user_id = this._AuthService.getUserId();
    this._GeneralService.execute(`pessoas/users/${user_id}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => { 
        this.pessoa = res.data || this.pessoa; 
        this.pessoa.formacoes = this.pessoa.formacoes || [];
        this.pessoa.contactos = this.pessoa.contactos || [];

        if (this.pessoa.formacoes.length) {
             this.setEtapa(3);
        } else if (this.pessoa.contactos.length) {
         this.setEtapa(2);
        }
      }
    );
  }

  carregarDadosBolsa(bolsa_id) {
    this._GeneralService.execute(`bolsas/${bolsa_id}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => {
        if (!res) {
          this._Router.navigate(['candidatura-detalhes']);
        } else {
         
     //     console.log( this._AuthService.getCurrentActualizar());
   // console.log(this.pessoa);
        // && this.pessoa.user.actualizar_candidatura!== res.data.id
        //|| this._AuthService.getCurrentActualizar()== bolsa_id
     //    if ( res.data.estado==1 )
     //      {
            this.bolsa = res.data 
            this.carregarDadosPessoaLogada(bolsa_id);
       //    }  
       /*  else{
          this._Router.navigate(['candidatura-detalhes']);
            }*/
        }
      }
    );
  } 

  candidaturaDetalhes() {
    this._Router.navigate(['candidatura-detalhes']);
  } 
  setEtapa(etapa) { 
    if (etapa!==4){
    this.salvarPessoa(etapa); 
     } else
    {  
      this.listarPessoa(etapa); 
    }  
  }
  onNotify(pessoa: Pessoa): void {
    this.pessoa = pessoa;
  }
 
  listarPessoa(etapa) {
    const user_id = this._AuthService.getUserId();
    this._GeneralService.execute(`pessoas/users/${user_id}`, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => {
        this.pessoa = res.data || this.pessoa;
        this.pessoa.formacoes = this.pessoa.formacoes || [];
        this.pessoa.contactos = this.pessoa.contactos || [];
        if (res.data) {
          this.etapa = etapa;
        }
      }
    );
  }
  salvarPessoa(etapa) {
    this.pessoa.user_id = this._AuthService.getUserId();
    this._GeneralService.execute(`pessoas`, GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.pessoa).subscribe(
      res => {
        this.pessoa = res.data || this.pessoa;
        this.pessoa.formacoes = this.pessoa.formacoes || [];
        this.pessoa.contactos = this.pessoa.contactos || [];
        if (res.data) {
          this.etapa = etapa;
        }
      }
    );
  }

}
