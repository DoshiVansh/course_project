import { Component, OnDestroy, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { shoppinglistService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shopping-list',
  standalone : true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  imports:[ShoppingEditComponent,
    ReactiveFormsModule,CommonModule]
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients:ingredient[];
  private ingchangedsub:Subscription;

  constructor(private shoppinglistservice:shoppinglistService){}
  ngOnDestroy(): void {
    this.ingchangedsub.unsubscribe();
  }

  oneditItem(index:number){
    this.shoppinglistservice.startedEditing.next(index);
  }
  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.allingredientslist;
    this.ingchangedsub = this.shoppinglistservice.ingchanged.subscribe(
      (ingredientlists:ingredient[]) => {
        this.ingredients = ingredientlists;
      }
    )
  }
}
