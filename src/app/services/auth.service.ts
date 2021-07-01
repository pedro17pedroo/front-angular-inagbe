import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLoged = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient, private router: Router
  ) {
  }

  verifyUserLoged() {
    if (localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY) != null) {
      this.isUserLoged.next(true);
    }
    return this.isUserLoged.asObservable();
  }

  setLogin(userToken : string, id : string, userName : string, perfil ? : string, userUpdate ? : string){
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, userToken);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERID_KEY, id);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERNAME_KEY, userName);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERPROFILE_KEY, perfil);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERUPDATECANDIDATURA_KEY, userUpdate);
    this.isUserLoged.next(true);
    switch (parseInt(perfil)){
      case GeneralConstants.USERS_PERFIS.REGISTO_UTENTE.code:
        this.router.navigate(['/utentes-home']);
      break;
      case GeneralConstants.USERS_PERFIS.REGISTO_CANDIDATO.code:
        this.router.navigate(['/candidatos-init']);
      break;
      case GeneralConstants.USERS_PERFIS.IMPRESSORA.code:
        this.router.navigate(['/candidatos-print-list']);
      break;

      default:
        this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERPROFILE_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERPROFILE_KEY);
    this.isUserLoged.next(false);
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
  }

  getUserId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }
 
  getCurrentUser() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
  }
  getCurrentActualizar() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERUPDATECANDIDATURA_KEY);
  }
}
