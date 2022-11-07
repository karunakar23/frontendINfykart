import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../login/authenticate.service';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updateForm!:FormGroup;
  public errormsg!:string;
  public successMsg!:string;
  constructor(private fb: FormBuilder,private Service:UpdateService,private authService:AuthenticateService) { }

  ngOnInit(): void {
    this.updateForm=this.fb.group(
      {
        Name:['',{validators:[Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]}],
        Password:[ '',{validators:[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/)]}]
      }
    );
  }
  update(){
    this.Service.update(this.authService.UserID,this.updateForm.value.Name,this.updateForm.value.Password).subscribe({
      next: data=>this.successMsg=data,
      error: error=>this.errormsg=error.message
      }
    );
    
  }

}


