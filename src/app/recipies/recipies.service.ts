import { EventEmitter, Injectable } from "@angular/core";
import { recipies } from "./recipies.model";
import { ingredient } from "../shared/ingredient.model";
import { shoppinglistService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
@Injectable()
export class recipiesService{

  recipieschanged:Subject<recipies[]> = new Subject<recipies[]>()
  
    private recipiess: recipies[] = [];
    //  = [
    //     new recipies('test',
    //     'this is a test recipie and its preparation is easy',
    //     'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    //     ,[new ingredient('something',10),
    //       new ingredient('something2',20)]),
    //     new recipies('test2',
    //     'Secret preparation cannot share',
    //     'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    //     [new ingredient('something',10),
    //      new ingredient('something3',30) ])
    //   ];

      constructor(private shoppingserv:shoppinglistService){}
      public get recipiearraycopy() : recipies[] {
        return this.recipiess.slice();
      }

      setrecipiethroughhttp(recipiesar:recipies[]){
        this.recipiess = recipiesar
        this.recipieschanged.next(this.recipiess.slice())
      }

      addingredientstoshoppinglist(ingredients:ingredient[]){
        this.shoppingserv.addingredients(ingredients)
      }
      getrecipie(index:number){
        return this.recipiess[index];
      }

      addrecipie(newrecipie:recipies){
        this.recipiess.push(newrecipie)
        this.recipieschanged.next(this.recipiess.slice())
      }
      updaterecipie(index:number,updatedrecipie:recipies){
        this.recipiess[index] = updatedrecipie;
        this.recipieschanged.next(this.recipiess.slice())
      }
      deleterecipie(index:number){
        this.recipiess.splice(index,1)
        this.recipieschanged.next(this.recipiess.slice())
      }
}



