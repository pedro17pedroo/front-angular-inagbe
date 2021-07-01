import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-receber-email',
  templateUrl: './receber-email.component.html',
  styleUrls: ['./receber-email.component.css']
})
export class ReceberEmailComponent implements OnInit {

  user= new User();

  token = ""
  password2 = ""
  resources = 'users/recuperarsenha';
  constructor(private _GeneralService: GeneralService, private _AuthService: AuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService) { }

  ngOnInit() {
    
  }
  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

 
  receberemail() {
   
    console.log(this.user);
    if (this.validateEmail(this.user.email))
      this._GeneralService.execute(`users/receberemail`, GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE, this.user).subscribe(
        res => {
          if(res.data)
        {       this._Router.navigate(['/recuperarsenha']); 
        }
        }
      );
      else {
        this.toasterService.error("Este Email não é valido ", 'Atenção');
      }
 
  }
 
 
}
