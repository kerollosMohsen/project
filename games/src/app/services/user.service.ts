import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Cart } from '../shared/models/cart';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/models/constants/urls';
import { User } from '../shared/models/user';


const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable:Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable= this.userSubject.asObservable()
   }

   public get currentUser():any{
    // console.log( this.userSubject.value)
    return this.userSubject.value.data.userData;
  }
   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUsertoLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Games`,
            'Login successful'
          )
        },
        error:(err)=>{
          console.log(err)
          let errMsg=''
          if(err.statusText=='Internal Server Error'){errMsg='User Name or Passowrd is not correct'}
          this.toastrService.error(errMsg,'Login Failed')
        }
      })
    )
   }

   register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUsertoLocalStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Games`,
            'Register Successful'
          )
        },
        error:(err)=>{
          let errMsg=''
          this.toastrService.error(
            
            err.message,'register Failed'
          )
        }
      })
      )
   }

   logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
   }

   private setUsertoLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
   }
   private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User
    return new User()
   }
   private getCartFromLocalStorage():Cart{
    const cartJson =localStorage.getItem('cart') 
    return cartJson? JSON.parse(cartJson):new Cart()
  }
}
