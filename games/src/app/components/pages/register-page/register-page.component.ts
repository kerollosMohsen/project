import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordMatchValidator } from 'src/app/shared/validators/passwordValidator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup
  isSubmitted=false

  returnUrl=''
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.registerForm= this.formBuilder.group({
      userName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
    },{
      validators:PasswordMatchValidator('password','confirmPassword')
    })

    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl
  }

  get fc(){
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted=true
    if(this.registerForm.invalid) return

    const fv =this.registerForm.value
    const user:IUserRegister={
      userName:fv.userName,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmPassword
    }

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}
