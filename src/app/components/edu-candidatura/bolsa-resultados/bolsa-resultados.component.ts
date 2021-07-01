import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants'; 
import { Constant } from 'src/app/models/Constant';
import { Router } from '@angular/router';
import { BolsaResultado } from 'src/app/models/bolsaResultado';
@Component({
  selector: 'app-bolsa-resultados',
  templateUrl: './bolsa-resultados.component.html',
  styleUrls: ['./bolsa-resultados.component.css']
})
export class BolsaResultadosComponent implements OnInit {
 
  bolsaresultados: BolsaResultado[]; 
  resourcesBolsaResultados = 'bolsaresultados';
  estados: Constant[];
  constructor(private _GeneralService: GeneralService, private _Router : Router ) { }
  ngOnInit() {
    this.popularDados();
  }
  popularDados() { 
    this.carregarResultados();
  }
  carregarResultados() {
    this._GeneralService.execute(this.resourcesBolsaResultados, GeneralConstants.CRUD_OPERATIONS.READ).subscribe(
      (res: any) => {
        this.bolsaresultados = res.data;
      }
    );
  }
  detalhar(id : any){
    this._Router.navigate(['bolsa-resultado-detalhes', id]);
  }
  detalharResultado(id : any){
    this._Router.navigate(['bolsa-resultado-detalhes', id]);
  }
}
