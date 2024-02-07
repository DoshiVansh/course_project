
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs' 
import {map, tap } from 'rxjs/operators';
import { authService } from './auth.service';import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authserv: authService, private router: Router, private route: ActivatedRoute) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.authserv.user.pipe(
            map(user => {
                console.log(!!(user))
                const isAuth = !!(user);
                if (!isAuth) {
                    this.router.navigate(['/auth'], {relativeTo: this.route});
                }
                return isAuth;
    })
    )
    }
}








/*        return authserv.user.pipe(
            map(user =>{
                const isAuth = !!(user);
                if(isAuth){
                    return true;
                }
                return router.createUrlTree(['/auth']);
            }),
        )*/