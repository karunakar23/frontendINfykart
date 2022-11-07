import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  // {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:FormComponent},
  {path:"update",component:UpdateComponent,canActivate:[LoginGuard]},
  {path:"authenticate",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
