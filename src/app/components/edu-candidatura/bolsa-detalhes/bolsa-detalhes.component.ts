import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bolsa } from './../../../models/bolsa';
import { GeneralService } from './../../../services/general.service';
import { GeneralConstants } from './../../../constants/GeneralConstants';

@Component({
  selector: 'app-bolsa-detalhes',
  templateUrl: './bolsa-detalhes.component.html',
  styleUrls: ['./bolsa-detalhes.component.css']
})
export class BolsaDetalhesComponent implements OnInit {
  bolsa : Bolsa;

  constructor(private _GeneralService : GeneralService, private _Router : Router) { }

  ngOnInit(): void {
    const id = this._Router.url.split('/').pop();
    this._GeneralService.execute('bolsas/' + id, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => this.bolsa = res.data
    )
  }

}
