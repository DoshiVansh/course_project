import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { authService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports:[
    ReactiveFormsModule,
    FormsModule,LoadingSpinnerComponent,HttpClientModule,CommonModule]
})
export class AuthComponent {
  loginmode:boolean = true;
  isloading:boolean = false;
  error:string = null;

  constructor(private authserv:authService,private router:Router){}

  onshiftmode(){
    this.loginmode = !this.loginmode;
  }

  onsubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const enteredemail:string = form.value.email;
    const enteredpassword:string = form.value.password;
    this.isloading=true;
    if(this.loginmode){
      this.authserv.login(enteredemail,enteredpassword).subscribe({
        next:(resData) => {
          console.log(resData)
          this.isloading=false;
          this.router.navigate(['/recipies']);
        },
        error:(errorData)=>{
          console.log(errorData)
          if(errorData.error.error){
            this.error = errorData.error.error.message
          }else{
            this.error = 'an unknown error occured';
          }
          this.isloading = false;
        }
      })
    }
    else{
      this.authserv.signup(enteredemail,enteredpassword).subscribe({
        next:(resData) => {
          console.log(resData)
          this.isloading=false;
          this.loginmode=true; //added on my own to set signp button to login button after user has signed up
        },
        error:(errorData)=>{
          console.log(errorData)
          if(errorData.error.error){
            this.error = errorData.error.error.message
          }else{
            this.error = 'an unknown error occured';
          }
          this.isloading = false;
        }
      })
    }
    form.reset();
  }

}
