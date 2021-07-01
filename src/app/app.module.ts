import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/layout/home/home.component';
import { BolsaComponent } from './components/edu-candidatura/bolsa/bolsa.component';
import { ResultadoComponent } from './components/edu-candidatura/resultado/resultado.component';
import { LoginComponent } from './components/edu-candidatura/login/login.component';
import { CriarcontaComponent } from './components/edu-candidatura/criarconta/criarconta.component';
import { RecuperarsenhaComponent } from './components/edu-candidatura/recuperarsenha/recuperarsenha.component';
import { CandidaturaComponent } from './components/edu-candidatura/candidatura/candidatura.component';
import { PerfilComponent } from './components/edu-candidatura/perfil/perfil.component';
import { PaginaNaoEncontradaComponent } from './components/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ServidorIndisponivelComponent } from './components/layout/servidor-indisponivel/servidor-indisponivel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './HttpInterceptors/ApiInterceptor';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BolsaDetalhesComponent } from './components/edu-candidatura/bolsa-detalhes/bolsa-detalhes.component';
import { CandidaturaFormComponent } from './components/edu-candidatura/candidatura-form/candidatura-form.component';
import { FormPessoalComponent } from './components/edu-candidatura/form-pessoal/form-pessoal.component';
import { FormFormacaoAnteriorComponent } from './components/edu-candidatura/form-formacao-anterior/form-formacao-anterior.component';
import { FormCandidaturaInternaComponent } from './components/edu-candidatura/form-candidatura-interna/form-candidatura-interna.component';
import { FormAnexoComponent } from './components/edu-candidatura/form-anexo/form-anexo.component';
import { CandidaturaDetalhesComponent } from './components/edu-candidatura/candidatura-detalhes/candidatura-detalhes.component';
import { PessoaContactosListComponent } from './components/edu-candidatura/pessoa-contactos-list/pessoa-contactos-list.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BolsaResultadosComponent } from './components/edu-candidatura/bolsa-resultados/bolsa-resultados.component';
import { BolsaResultadoDetalhesComponent } from './components/edu-candidatura/bolsa-resultado-detalhes/bolsa-resultado-detalhes.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { NotificacaoDialogComponent } from './components/layout/notificacao-dialog/notificacao-dialog.component';
import { TrocarSenhaComponent } from './components/edu-candidatura/trocar-senha/trocar-senha.component';
import { ReceberEmailComponent } from './components/edu-candidatura/receber-email/receber-email.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BolsaComponent,
    ResultadoComponent,
    LoginComponent,
    CriarcontaComponent,
    RecuperarsenhaComponent,
    CandidaturaComponent,
    PerfilComponent,
    PaginaNaoEncontradaComponent,
    ServidorIndisponivelComponent,
    BolsaDetalhesComponent,
    CandidaturaFormComponent,
    FormPessoalComponent,
    FormFormacaoAnteriorComponent,
    FormCandidaturaInternaComponent,
    FormAnexoComponent,
    CandidaturaDetalhesComponent,
    PessoaContactosListComponent,
    BolsaResultadosComponent,
    BolsaResultadoDetalhesComponent,
    NotificacaoDialogComponent,
    TrocarSenhaComponent,
    ReceberEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatMomentDateModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    FileUploadModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
