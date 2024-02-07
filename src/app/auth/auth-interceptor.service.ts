import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { authService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authserv:authService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authserv.user.pipe(take(1),exhaustMap(user=>{
            if(user){
                let modifiedreq = req.clone({params: new HttpParams().set('auth',user.token)})
                return next.handle(modifiedreq)
            }else{
                return next.handle(req)
            }
        }))
    }

}