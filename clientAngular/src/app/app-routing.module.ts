import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CareerComponent } from './career/career.component';


const routes: Routes = [
  { path: '', redirectTo:"/login", pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'career', component: CareerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
