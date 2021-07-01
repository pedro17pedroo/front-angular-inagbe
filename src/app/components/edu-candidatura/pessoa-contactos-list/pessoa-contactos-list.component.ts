import { Component, OnInit, Input } from '@angular/core';
import { Contacto } from 'src/app/models/contacto';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/models/Constant';
import { GeneralService } from 'src/app/services/general.service';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';

@Component({
  selector: 'app-pessoa-contactos-list',
  templateUrl: './pessoa-contactos-list.component.html',
  styleUrls: ['./pessoa-contactos-list.component.css']
})
export class PessoaContactosListComponent implements OnInit {

  @Input() pessoa;
  displayedColumns: string[] = ['tipo_contacto', 'contacto', 'accao'];
  dataSource: MatTableDataSource<Contacto>;

  tiposContactos: Constant[];
  contacto = new Contacto();


  constructor(private _GeneralService: GeneralService) { }

  ngOnInit(): void {
    this._GeneralService
    .execute(
      "constants?tipo=tipos_contactos",
      GeneralConstants.CRUD_OPERATIONS.READ
    )
    .subscribe(res => {
      this.tiposContactos = res.data;
      this.actualizarTabela();
    });
  }

  actualizarTabela(){
    this.dataSource = new MatTableDataSource<Contacto>(this.pessoa.contactos);
  }

  adicionarContacto() {
    if (this.contacto.tipo_contacto == undefined || !this.contacto.contacto) {
      return null;
    }

    this.pessoa.contactos = this.pessoa.contactos.filter(
      (c: any) => (this.contacto.id && c.id != this.contacto.id) || (c.tipo_contacto != this.contacto.tipo_contacto && c.contacto != this.contacto.contacto)
    );

    this.pessoa.contactos.push({...this.contacto});

    this.contacto = new Contacto();
    this.actualizarTabela();
  }

  removerContacto(contacto) {
    this.pessoa.contactos = this.pessoa.contactos.filter(
      (c: any) => (contacto.id && c.id != contacto.id) || (c.tipoContacto != contacto.tipo_contacto && c.contacto != contacto.contacto)
    );
    this.actualizarTabela();
  }

  editarContacto(contacto) {
    const contactoObject = this.pessoa.contactos.filter(
      (c: any) => (contacto.id && c.id == contacto.id) || (c.tipo_contacto == contacto.tipo_contacto && c.contacto == contacto.contacto)
    ).pop();
    if (contactoObject){
      this.contacto = {...contactoObject};
    }
  }

  getInfoTipoContacto(code){
    const tipoContacto = this.tiposContactos.filter(tc => tc.code == code).pop();
    return tipoContacto ? tipoContacto.info : '';
  }
}
