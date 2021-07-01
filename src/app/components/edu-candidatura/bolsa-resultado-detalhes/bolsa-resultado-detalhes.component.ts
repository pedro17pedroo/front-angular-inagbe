import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bolsa } from './../../../models/bolsa';
import { GeneralService } from './../../../services/general.service';
import { GeneralConstants } from './../../../constants/GeneralConstants';
import { BolsaResultado } from 'src/app/models/bolsaResultado';

@Component({
  selector: 'app-bolsa-resultado-detalhes',
  templateUrl: './bolsa-resultado-detalhes.component.html',
  styleUrls: ['./bolsa-resultado-detalhes.component.css']
})
export class BolsaResultadoDetalhesComponent implements OnInit {
  bolsaresultados: BolsaResultado;
  bolsa: Bolsa;

  constructor(private _GeneralService: GeneralService, private _Router: Router) { }

  ngOnInit(): void {
    const bolsa_id = this._Router.url.split('/').pop();

    this._GeneralService.execute('bolsas/' + bolsa_id, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => this.bolsa = res.data)

    this._GeneralService.execute('bolsaresultados/' + bolsa_id, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      res => this.bolsaresultados = res.data)
  }
}
