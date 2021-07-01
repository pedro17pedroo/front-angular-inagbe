import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criarconta',
  templateUrl: './criarconta.component.html',
  styleUrls: ['./criarconta.component.css']
})
export class CriarcontaComponent implements OnInit {

  password2 = ""
  user: User;
  resources = 'users';
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  //password2conf = new FormControl('', [Validators.required, Validators.minLength(5)]);
 

  ngOnInit() {
    this.user = new User();
  }


  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }


  registar() {
    if (this.user.email == null) {
      this.toasterService.info("Deve preencher o correio electrónico", 'Atenção');
    }

    else {
      if (this.user.password == null || this.password2 == null) {
        this.toasterService.info("Deve preencher e confirmar a palavra.passe", 'Atenção');
      }

      else {
        const bolsa_id = this._Router.url.split('/').pop();
        this.user.username = this.user.email;

        if (this.validateEmail(this.user.email))

          if (this.user.password === this.password2)
            this._GeneralService.execute(this.resources, GeneralConstants.CRUD_OPERATIONS.INSERT, this.user).subscribe(
              res => {
                if (res.messageType == 1) {
                  this._AuthService.setLogin(res.data.token, res.data.id, res.data.username, res.data.perfil);
                  if (!isNaN(parseInt(bolsa_id))) {
                    this._Router.navigate(['/candidatura-form/' + bolsa_id]);
                  } else {
                    this._Router.navigate(['/']);
                  }
                }
              }
            );
          else {
            this.toasterService.error("A senha de confirmação é diferente ", 'Atenção');
          }
        else {
          this.toasterService.error("Este Email não é valido ", 'Atenção');
        }
      }
    }
  }

}
