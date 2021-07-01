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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  tiposContactos: Constant[];
  pessoa = new Pessoa();
  bolsa: Bolsa;
  user=""
  etapa = 1;
  generos: Constant[];
  estadosCivis: Constant[];
  dataSource: MatTableDataSource<Candidatura>;
  tem_anexo = false;
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit() {

    this._AuthService.verifyUserLoged().subscribe(res => {
      if (!res) {
        this._Router.navigate(['/login/' ]);
      } else { 
        this.carregarDadosPessoaLogada();
 
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
    this.user = this._AuthService.getCurrentUser()
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

  trocarSenha() {
    this._Router.navigate(['trocar-senha']);
  } 
}
