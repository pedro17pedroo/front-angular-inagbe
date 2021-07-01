import { Component, OnInit, Input } from "@angular/core";
import { TipoAnexo } from "src/app/models/TipoAnexo";
import { GeneralService } from "./../../../services/general.service";
import { GeneralConstants } from "src/app/constants/GeneralConstants";
import { Pessoa } from './../../../models/pessoa';

@Component({
  selector: "app-form-anexo",
  templateUrl: "./form-anexo.component.html",
  styleUrls: ["./form-anexo.component.css"]
})
export class FormAnexoComponent implements OnInit {
  @Input() pessoa: Pessoa;
  tipos_anexos: TipoAnexo[];
  uploadedFiles = [];

  constructor(private _GeneralService: GeneralService) { }

  ngOnInit(): void {
    this.popularDados();
  }

  popularDados() {
    this._GeneralService
      .execute("tiposanexos?categoria=1", GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe(res => {
        this.tipos_anexos = res.data;
      });
  }
  fileChange(element, tipoAnexo: string) {
    var fileName = element.target.files[0].name;
    this.uploadedFiles.push({ tipoAnexo: tipoAnexo, files: element.target.files, fileName });


  }

  upload(tipoAnexo?) {

    const uploadedFiles = tipoAnexo ? this.uploadedFiles.filter(f => f.tipoAnexo == tipoAnexo) : this.uploadedFiles;
    let formData = new FormData();
    for (var i = 0; i < uploadedFiles.length; i++) {
      for (var j = 0; j < uploadedFiles[i].files.length; j++) {
        formData.append(`uploads_${uploadedFiles[i].tipoAnexo}[]`, uploadedFiles[i].files[j], uploadedFiles[i].files[j].name);
      }
    }
    this._GeneralService.execute(`pessoas/${this.pessoa.id}/anexos/upload`, GeneralConstants.CRUD_OPERATIONS.INSERT, formData).subscribe(
      (response) => {
        console.log('response received is ', response);
      })
  }
}
