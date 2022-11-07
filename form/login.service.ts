import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserDTO} from "./user"
import {Observable} from 'rxjs';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Error!:any;
  constructor(private http:HttpClient) { }
  registerUser(user:UserDTO):Observable<any>{
    console.log(user.userId+" "+user.password+" "+user.name);
    let obj={
      "userId":user.userId,
      "name":user.name,
      "password":user.password
  }
    return this.http.post("http://localhost:8080/signup",obj,{responseType:'text'});
  }
}
