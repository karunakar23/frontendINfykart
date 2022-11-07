import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../form/login.service';
import { UserDTO } from '../form/user';
import { AuthenticateService } from './authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  id!: string;
  authForm!: FormGroup;
  invalidCredentialMsg!: string;
  error!:any;
  constructor(
    private fb: FormBuilder,
    private Service: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      UserId: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]+.com$/),
          ],
        },
      ],
      Password: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
            ),
          ],
        },
      ],
    });
  }
  Authenticate() {
    var id!:string;
    var pass!:string;
    const UserId =this.authForm.value.UserId;
    this.id = UserId;
    const Password = this.authForm.value.Password;
    this.Service.getUser(UserId).subscribe({
      next:(data)=>{
        id=data.userId;
        pass=data.password;
        if(this.Service.Authenticate(UserId, Password,id,pass)){
          this.router.navigate(['/update']);
        }else{
          this.invalidCredentialMsg = 'Invalid Credentials Try Again';
        }
      },
      error: error=>{
        this.error=error.message;
      }
    });
 
  }
}
