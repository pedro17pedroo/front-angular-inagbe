import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GeneralService } from './../../../services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new User();
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService, private _Router: Router) { }

  login() {
    console.log(this.user)

    this._GeneralService.execute('login', GeneralConstants.CRUD_OPERATIONS.INSERT, this.user).subscribe(
      res => {
        if (res.data.token) {

          this._AuthService.setLogin(res.data.token, res.data.id, res.data.username, res.data.perfil, res.data.actualizar_candidatura);
          const bolsa_id = this._Router.url.split('/').pop();
          if (!isNaN(parseInt(bolsa_id))) {
            this._Router.navigate(['/candidatura-form/' + bolsa_id]);
          }
        }
      }
    );
  }

  chamarCadastro() {
    const bolsa_id = this._Router.url.split('/').pop();
    if (!isNaN(parseInt(bolsa_id))) {
      this._Router.navigate(['/criarconta/' + bolsa_id]);
    } else {
      this._Router.navigate(['/criarconta']);
    }
  }

  receberemail() {
    this._Router.navigate(['/receberemail']);
  }

}
