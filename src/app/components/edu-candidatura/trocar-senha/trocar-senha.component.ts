import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css']
})
export class TrocarSenhaComponent implements OnInit {

  user= new User();

  password2 = ""
  resources = 'users/trocarSenha';
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService) { }

  ngOnInit() {
    
  }

  trocarSenha() {

    this.user.id = this._AuthService. getUserId(); 
    this.user.email = this._AuthService.getCurrentUser();
 
    if (this.user.password === this.password2) 

      this._GeneralService.execute(`users`, GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.user).subscribe(
        res => {
          if (res.messageType == 1) {
            this._AuthService.setLogin(res.data.token, res.data.id, res.data.username, res.data.perfil);

           // this._Router.navigate(['/perfil']);

          }
        }
      );

    else {
      this.toasterService.error("A senha de confirmação  é diferente ", 'Atenção');
    }
  }

}
