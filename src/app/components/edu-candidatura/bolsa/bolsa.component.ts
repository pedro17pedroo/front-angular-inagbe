import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Bolsa } from 'src/app/models/bolsa';
import { Constant } from 'src/app/models/Constant';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.css']
})

export class BolsaComponent implements OnInit {

  bolsas: Bolsa[];
  resources = 'bolsas';
  listarByLogin = 'bolsasByLogin';
  estados: Constant[];
  isLogged  = false;
  user = new User();
  constructor(private _AuthService : AuthService, private _GeneralService: GeneralService, private _Router : Router ) { }

  ngOnInit() {
    this._AuthService.verifyUserLoged().subscribe( res => { this.isLogged  = res;}) 
    this.user.actualizar_candidatura = this._AuthService.getCurrentActualizar();
    this.popularDados();
  }
  popularDados() {
    this.carregarLista();
  }

  getEstadoInfo(code) {
    return this.estados.filter(e => e.code == code).pop().info;
  }
 /* na busca das bolsas é possivel alguns candidatos terem acesso a uma bolsa ja encerrada caso no acto da 
 validação o inagbe precisa activar esta funcionalidade para o candidato submeter alguma informação adicional*/
  carregarLista() {

      if (this.user.actualizar_candidatura ===null)
        { this._GeneralService.execute(this.resources, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
            (res: any) => {
              this.bolsas = res.data;
            }
          );
        }
    else{
 
    this._GeneralService.execute('bolsasactivas/' + this.user.actualizar_candidatura , GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => this.bolsas = res.data
    )
    }
  }

  detalhar(id : any){
    this._Router.navigate(['bolsa-detalhes', id]);
  }


}
