import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Bolsa } from 'src/app/models/bolsa';
import { Constant } from 'src/app/models/Constant';
import { Router } from '@angular/router';
import { BolsaResultado } from 'src/app/models/bolsaResultado';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


import { MatDialog } from '@angular/material/dialog';
import { NotificacaoDialogComponent } from '../notificacao-dialog/notificacao-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  bolsas: Bolsa[];
  bolsaresultados: BolsaResultado[];
  resourcesBolsas = 'bolsas';
  resourcesBolsaResultados = 'bolsaresultados';
  estados: Constant[];

  isLogged  = false;
  user = new User();
  constructor(private _AuthService : AuthService, private _GeneralService: GeneralService, private _Router : Router ,
   
      public dialog: MatDialog
  
  
    ) { }

  ngOnInit() {
    this._AuthService.verifyUserLoged().subscribe( res => { this.isLogged  = res;}) 
    this.user.actualizar_candidatura = this._AuthService.getCurrentActualizar();
    this.popularDados();

   this.callModal( ) 
  }
  popularDados() {
    this.carregarBolsas();
    this.carregarResultados();
  }

 /* na busca das bolsas é possivel alguns candidatos terem acesso a uma bolsa ja encerrada caso no acto da 
 validação o inagbe precisa activar esta funcionalidade para o candidato submeter alguma informação adicional*/
  carregarBolsas() {
    if (this.user.actualizar_candidatura ===null)
       {   this._GeneralService.execute(this.resourcesBolsas, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
          (res: any) => {
            this.bolsas= res.data;
          }
        ); 
    }
        else{

        this._GeneralService.execute('bolsasactivas/' + this.user.actualizar_candidatura , GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
          res => this.bolsas = res.data
        )
        }
    }
  carregarResultados() {
    this._GeneralService.execute(this.resourcesBolsaResultados, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      (res: any) => {
        this. bolsaresultados = res.data;
      }
    );
  }

  detalhar(id : any){
    this._Router.navigate(['bolsa-detalhes', id]);
  }


  detalharResultado(id : any){
    this._Router.navigate(['bolsa-resultado-detalhes', id]);
  }



  callModal(user?: User, pOperacao? : any) {
    let operacao = GeneralConstants.CRUD_OPERATIONS.UPDATE;
    if (user){
      operacao = pOperacao == 'delete' ?
      GeneralConstants.CRUD_OPERATIONS.DELETE : GeneralConstants.CRUD_OPERATIONS.UPDATE;
    }else{
      operacao = GeneralConstants.CRUD_OPERATIONS.INSERT;
    }
/*
    const dialogRef = this.dialog.open(NotificacaoDialogComponent,
      { 
        data: {
          user: user ? user : new User(),
          operacao: operacao,
       //   resources : this.resources,
          estados : this.estados
        },
        width: '700px'
      }
    );

    dialogRef.afterClosed().subscribe((result) => {     });
    */
  }

}
