import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import {UserDTO} from "./user";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public loginForm!:FormGroup;
  submitted!:Boolean;
  statusMSG!:string;
  error!:any;
  constructor(private fb:FormBuilder,private service:LoginService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        Email:['',{updateOn:'submit',validators:[Validators.required,Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+.com$/)]}],
        Name:['',{updateOn:'submit',validators:[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]}],
        Password:[ '',{updateOn:'submit',validators:[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/)]}],
        Confirm_Password:['',{updateOn:'submit',validators:[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/)]}]

      },{
        validator: ConfirmPasswordValidator("Password", "Confirm_Password")
      }
    );
  }
  login(){
    this.submitted=true;
    let user=new UserDTO(this.loginForm.value.Email,this.loginForm.controls['Name'].value,this.loginForm.controls['Password'].value);
    this.service.registerUser(user).subscribe({
      next: data=>this.statusMSG=data,
      error: error=>{
        this.error=error.message;

      }
    }
    );
  }
  
  
}
 function ConfirmPasswordValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName]
    if(matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']){
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}