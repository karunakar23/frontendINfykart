import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router,private Service:AuthenticateService) { }
  canActivate():boolean{
    if(this.Service.getAuthentication()){
      return true;
    }
    this.router.navigate(['/authenticate']);
    console.log("hello world");
    return false;
  }
  
}
