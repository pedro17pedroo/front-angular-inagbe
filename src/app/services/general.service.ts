import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { GeneralConstants } from '../constants/GeneralConstants';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private _http: HttpClient, private _AuthService : AuthService) { }

  execute(resource : string, operacao : any, body? : any, _blank? : string ): Observable<any> {

    const url = `${environment.baseUrl}/${resource}`;

    if (operacao === GeneralConstants.CRUD_OPERATIONS.READ){
      return this._http.get<any[]>(url).pipe();
    }else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT){
      return this._http.post<any>(url, body);
    }

    if (typeof body?.get === "function"){
      body.id = body.get('id');
    }

    const userId = this._AuthService.getUserId();
    const id = body?.id
    ? body.id
    : (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE ? undefined : '');
    const url_id = id != '' ? `${url}/${id}?token=${userId}` : `${url}?token=${userId}`;

    if (operacao === GeneralConstants.CRUD_OPERATIONS.GET){
      if (_blank != ''){
        window.open(url_id, '_blank');
        return;
      }
      return this._http.get<any>(url_id).pipe();
    }else if (operacao === GeneralConstants.CRUD_OPERATIONS.UPDATE){
      return this._http.patch<any>(url_id, body);
    }else if (operacao === GeneralConstants.CRUD_OPERATIONS.INSERT_OR_UPDATE){
      return this._http.put<any>(url_id, body);
    }else if (operacao === GeneralConstants.CRUD_OPERATIONS.DELETE){
      return this._http.delete<any>(url_id);
    }

  }


   
}
