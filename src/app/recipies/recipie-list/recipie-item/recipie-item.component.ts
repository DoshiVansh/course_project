import { Component,Input} from '@angular/core';
import { recipies } from '../../recipies.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipie-item',
  standalone : true,
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css',
  imports:[RouterModule,CommonModule]
})
export class RecipieItemComponent {
  @Input() onerecipie:recipies;
  @Input() index:number;
}
