import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) {

   }
   update(userId:string,name:string,password:string):Observable<any>{
    let obj={
      "name":name,
      "password":password
    }
    return this.http.post("http://localhost:8080/"+userId+"/update",obj,{responseType:"text"});
   }
}
