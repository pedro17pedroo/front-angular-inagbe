import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { BolsaComponent } from './components/edu-candidatura/bolsa/bolsa.component';
import { BolsaDetalhesComponent } from './components/edu-candidatura/bolsa-detalhes/bolsa-detalhes.component';
import { CandidaturaComponent } from './components/edu-candidatura/candidatura/candidatura.component';
import { BolsaResultadosComponent } from './components/edu-candidatura/bolsa-resultados/bolsa-resultados.component';
import { BolsaResultadoDetalhesComponent } from './components/edu-candidatura/bolsa-resultado-detalhes/bolsa-resultado-detalhes.component';

import { CriarcontaComponent } from './components/edu-candidatura/criarconta/criarconta.component';
import { LoginComponent } from './components/edu-candidatura/login/login.component';
import { PerfilComponent } from './components/edu-candidatura/perfil/perfil.component';

import { TrocarSenhaComponent } from './components/edu-candidatura/trocar-senha/trocar-senha.component';

import { RecuperarsenhaComponent } from './components/edu-candidatura/recuperarsenha/recuperarsenha.component';


import { CandidaturaFormComponent } from './components/edu-candidatura/candidatura-form/candidatura-form.component';
import { CandidaturaDetalhesComponent } from './components/edu-candidatura/candidatura-detalhes/candidatura-detalhes.component';
import { ReceberEmailComponent } from './components/edu-candidatura/receber-email/receber-email.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'bolsa', component: BolsaComponent},
  {path:'bolsa-detalhes/:id', component: BolsaDetalhesComponent},
  {path:'candidatura-form/:bolsa_id', component: CandidaturaFormComponent},
  {path:'candidatura', component: CandidaturaComponent},
  {path:'candidatura-detalhes', component: CandidaturaDetalhesComponent},
  {path:'bolsa-resultado', component: BolsaResultadosComponent},
  {path:'bolsa-resultado-detalhes/:bolsa_id', component: BolsaResultadoDetalhesComponent},
  {path:'criarconta', component: CriarcontaComponent},
  {path:'criarconta/:bolsa_id', component: CriarcontaComponent},
  {path:'login', component: LoginComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'trocar-senha', component: TrocarSenhaComponent},
  
  {path:'receberemail', component: ReceberEmailComponent},
  {path:'recuperarsenha', component: RecuperarsenhaComponent},
  {path:'login/:bolsa_id', component: LoginComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
