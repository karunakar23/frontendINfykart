import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../form/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  Authenticated:boolean=false;
  UserID!:string;
  constructor(private http: HttpClient) { }
  getUser(userid:string):Observable<any>{
    return this.http.get<UserDTO>("http://localhost:8080/"+userid+"/get");
  }
  Authenticate(UserId:string,Password:string,id:string,pass:string):boolean{
    if((UserId===id)&&(Password===pass)){
      this.Authenticated=true;
      this.UserID=UserId;
      return true;
    }else{
      this.Authenticated=false;
      return false;
    }

  }
  getAuthentication(){
    return this.Authenticated;
  }
}
