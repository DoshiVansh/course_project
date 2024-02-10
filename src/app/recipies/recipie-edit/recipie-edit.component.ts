import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recipiesService } from '../recipies.service';
import { recipies } from '../recipies.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipie-edit',
  standalone: true,
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css',
  imports:[ReactiveFormsModule,FormsModule,CommonModule,DropdownDirective]
})
export class RecipieEditComponent implements OnInit,OnDestroy{

  recipieForm:FormGroup;

  constructor(private route:ActivatedRoute,private recipeserv:recipiesService,private router:Router){}
  id:number
  editMode = false;
  routeparamssubscription:Subscription;

  ngOnInit(): void {
    this.routeparamssubscription = this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initform();
      }
    )
  }

  ngOnDestroy(): void {
    this.routeparamssubscription.unsubscribe()
  }
  ondeleteingre(index:number){
    (<FormArray>this.recipieForm.get('ingredients')).removeAt(index)
  }
  onsubmit(){
    const newrecipie:recipies = new recipies(
      this.recipieForm.value['recipie_name'],
      this.recipieForm.value['description'],
      this.recipieForm.value['image-path'],
      this.recipieForm.value['ingredients']
    )
    if(this.editMode){
      this.recipeserv.updaterecipie(this.id,newrecipie)
    }else{
      this.recipeserv.addrecipie(newrecipie)
    }
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  oncancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onadding(){
    (<FormArray>this.recipieForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,[Validators.required]),
        'amount': new FormControl(1,[Validators.required,Validators.min(1)])
      })
    )
  }

  getcontrolss(){
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }
  
  private initform(){
    let recipiename = '';
    let recipieimagepath = '';
    let recipiedesc = '';
    let recipieingredients = new FormArray([])

    if(this.editMode){
      const currrecipie = this.recipeserv.getrecipie(this.id);
      recipiename = currrecipie.name;
      recipieimagepath = currrecipie.imagepath;
      recipiedesc = currrecipie.description;
      if(currrecipie['ingredients_used']){
        for(let ingredient of currrecipie.ingredients_used){
          recipieingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,[Validators.required]),
            'amount': new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])
          }));
        }
      }
    }
    this.recipieForm = new FormGroup({
      'recipie_name': new FormControl(recipiename,[Validators.required]),
      'image-path': new FormControl(recipieimagepath,[Validators.required]),
      'description': new FormControl(recipiedesc,[Validators.required]),
      'ingredients': recipieingredients
    })
  }
}

