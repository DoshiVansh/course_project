import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { recipiesService } from "../recipies/recipies.service";
import { recipies } from "../recipies/recipies.model";
import { Observable,map,tap } from "rxjs";
import { authService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    constructor(private http:HttpClient, private recipieserv:recipiesService,private authserv:authService){}

    storerecipies(){
        const recipies:recipies[] = this.recipieserv.recipiearraycopy
        this.http.put('https://recipie-book-courseproject-default-rtdb.firebaseio.com/recipies.json',recipies).subscribe(
            (response) => {
                console.log(response);
            }
        )
    }
    fetchrecipies():Observable<recipies[]>{
            return this.http.get<recipies[]>('https://recipie-book-courseproject-default-rtdb.firebaseio.com/recipies.json')
            .pipe( 
                map(
                    (recipieswithouting) => {
                        return recipieswithouting.map(
                            (recipie) => {
                                return {...recipie, 
                                        ingredients_used: recipie.ingredients_used ? recipie.ingredients_used : []
                                    }
                            }
                        )
                    }
                ),
                tap(
                    (recipies) => {
                        this.recipieserv.setrecipiethroughhttp(recipies);
                    }
                )
            )
           
    }
}