import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeaponListComponent } from './components/weapon-list/weapon-list.component';

const routes: Routes = [
  { path: 'weapons', component: WeaponListComponent },
  { path: '', redirectTo: '/weapons', pathMatch: 'full' }, // redireciona para weapons por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
