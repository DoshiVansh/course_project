import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment.development";

interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class authService{
    private tokenexpirationtimer:any;
    constructor(private http:HttpClient,private router:Router){}
    user = new BehaviorSubject<User>(null)
    signup(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIkey,{
            email: email,
            password: password,
            returnSecureToken:true
        }).pipe(tap(resData =>{
            const Expirationdate = new Date(new Date().getTime() + (+resData.expiresIn * 1000))
            const user = new User(resData.email,resData.localId,resData.idToken,Expirationdate)
            // this.user.next(user)
        }))
    }
    login(email:string,password:string){
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`+environment.firebaseAPIkey,{
            email: email,
            password: password,
            returnSecureToken:true
        }).pipe(tap(resData =>{
            const Expirationdate = new Date(new Date().getTime() + (+resData.expiresIn * 1000))
            const user = new User(resData.email,resData.localId,resData.idToken,Expirationdate)
            this.user.next(user)
            this.autologout(+resData.expiresIn * 1000)
            localStorage.setItem('userData',JSON.stringify(user))
        })) 
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth'])
        if(this.tokenexpirationtimer){
            clearTimeout(this.tokenexpirationtimer)
        }
        this.tokenexpirationtimer = null;

    }

    autologin(){
        const UserData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        console.log(UserData._token)
        console.log(UserData._tokenExpirationDate)
        if(!UserData){
            return;
        }
        const loadeduser = new User(UserData.email,UserData.id,UserData._token,new Date(UserData._tokenExpirationDate));
        console.log(loadeduser.token)
        if(loadeduser.token){
            console.log("now i will send a next user")
            this.user.next(loadeduser);
            const expirationDuration = new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autologout(expirationDuration);
        }
    }

    autologout(expirationduration:number){
        console.log(expirationduration)
        this.tokenexpirationtimer = setTimeout(() => {
            this.logout();
        },expirationduration);
    }
}