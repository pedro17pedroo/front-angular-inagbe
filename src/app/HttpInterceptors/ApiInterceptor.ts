import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    public toasterService: ToastrService,
    private authService: AuthService) {
  }

  private setHeaders(req: HttpRequest<any>){
    const token = this.auth.getToken();

    if (!token){
      return req;
    }

    return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
  }

  private showToastMessage(messageType, message, title?){
    if (messageType != 0) {
      this.toasterService.clear();
    }

    if (messageType === 1) {
      this.toasterService.success(message, 'Mensagem de Sucesso');
    } else if (messageType === 2) {
      this.toasterService.warning(message, 'Mensagem de Alerta');
    } else if (messageType === 3) { 
       this.toasterService.error(message, title ? title : 'Comunicação'); 
   // this.toasterService.warning("verifica a sua conexão", 'Mensagem de Alerta');
  
    }

  }

  contador: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.contador++;
    if (this.contador === 1) {
        this.spinner.show();
    }

    req = this.setHeaders(req);

    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.contador--;
        this.showToastMessage(evt.body.messageType, evt.body.message)
      }
    }), catchError((err: HttpErrorResponse) => {

      this.contador--;

      if (err.error instanceof ErrorEvent) {
        console.log(`Error: ${err.error.message}`);
      } else {
        console.log(`Error Code: ${err.status}\nMessagem: ${err.message}`);
      }

      let title = 'Comunicação';
      let errorMessage = err.message; 
    //  let errorMessage = 'Não foi possível comunicar-se com o servidor';

      if (err.status == 401) {
        title = 'Autenticação';
        errorMessage = 'Não foi possível aceder ao recurso solicitado';
        this.authService.logout();
      }

      this.showToastMessage(3, errorMessage, title);
      if (this.contador === 0){
        this.spinner.hide();
      }
       return throwError(err).subscribe;
    }), finalize(() => {
      if (this.contador === 0){
        this.spinner.hide();
      }
    })
    );
  }
}
