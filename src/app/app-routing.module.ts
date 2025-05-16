import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RoverComponent } from './components/rover/rover.component';
import { NeoComponent } from './components/neo/neo.component';
import { ApodComponent } from './components/apod/apod.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'apod', component: ApodComponent},
  {path: 'rover', component: RoverComponent},
  {path: 'neo', component: NeoComponent},
  {path: '**', component: ApodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
