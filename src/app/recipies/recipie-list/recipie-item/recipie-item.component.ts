import { Component,Input} from '@angular/core';
import { recipies } from '../../recipies.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
  @Input() onerecipie:recipies;
  @Input() index:number;
}
