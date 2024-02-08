import { Component, OnInit } from '@angular/core';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipies',
  standalone : true,
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  providers:[],
  imports:[RecipieListComponent,RouterModule,ReactiveFormsModule,CommonModule]
})
export class RecipiesComponent implements OnInit {
  ngOnInit(): void {
  }
}
