import {Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { recipies } from "./recipies.model";
import { recipiesService } from "./recipies.service";


@Injectable({providedIn:'root'})
export class RecipiesResolverService implements Resolve<Observable<recipies[]>>{
    constructor(private datastorageserv:DataStorageService, private recipieserv:recipiesService){}

    resolve = (route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<recipies[]> => {
        const recipies = this.recipieserv.recipiearraycopy
        if(recipies.length === 0){
            return this.datastorageserv.fetchrecipies(); 
        }
    }
}