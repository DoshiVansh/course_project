import { Injectable } from "@angular/core";
import { ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class shoppinglistService{
  ingchanged = new Subject<ingredient[]>();
  startedEditing = new Subject<number>();


    private allingredients:ingredient[] = [
        new ingredient('Apple',5),
        new ingredient('Tomatoes',10)
      ];
      

      getingat(index:number){
        return this.allingredients[index];
      }
      public get allingredientslist() : ingredient[] {
        return this.allingredients.slice()
      }

      onaddingredients(ing:ingredient){
        this.allingredients.push(ing)
        this.ingchanged.next(this.allingredients.slice())
      }

      addingredients(ingerdients:ingredient[]){
        this.allingredients.push(...ingerdients);
        this.ingchanged.next(this.allingredients.slice())
      }
      updateing(index:number,newing:ingredient){
        this.allingredients[index] = newing;
        this.ingchanged.next(this.allingredients.slice())
      }

      deleteing(index:number){
        this.allingredients.splice(index,1);
        this.ingchanged.next(this.allingredients.slice())
      }
      
}