import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { shoppinglistService } from '../shopping-list.service';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  standalone : true,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
  imports:[ReactiveFormsModule,CommonModule]
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('ingredientname') elref_name:ElementRef;
  @ViewChild('ingredientamount') elref_amount:ElementRef;
  shoppingingaddform: FormGroup;
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:ingredient;

  ngOnInit(): void {
    this.shoppingingaddform = new FormGroup({
      'ingname': new FormControl(null,[Validators.required]),
      'amount': new FormControl(1,[Validators.required,Validators.min(1)])
    })

    this.subscription = this.shoppingservice.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingservice.getingat(index);
        this.shoppingingaddform.setValue({
          'ingname':this.editedItem.name,
          'amount':this.editedItem.amount
        })
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  constructor(private shoppingservice:shoppinglistService){}

  onadddata(){
    const name = this.shoppingingaddform.value.ingname;
    const amount = this.shoppingingaddform.value.amount;
    const ingadded = new ingredient(name,amount);
    if (this.editMode) {
      this.shoppingservice.updateing(this.editedItemIndex,ingadded);
    }
    else{
      this.shoppingservice.onaddingredients(ingadded);
    }
    this.editMode = false;
    this.shoppingingaddform.reset();
  }
  onclear(){
    this.editMode = false;
    this.shoppingingaddform.reset();
  }
  ondelete(){
    this.shoppingservice.deleteing(this.editedItemIndex);
    this.onclear();
  }
}
