import { Component, OnDestroy, OnInit} from '@angular/core';
import { recipies } from '../recipies.model';
import { recipiesService } from '../recipies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrl: './recipie-detail.component.css'
})
export class RecipieDetailComponent implements OnInit,OnDestroy {
  particular_recipie_to_display:recipies;
  id:number;
  routeparamssubscription:Subscription;

  constructor(private recipieserv:recipiesService, private routee:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.routeparamssubscription = this.routee.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.particular_recipie_to_display = this.recipieserv.getrecipie(this.id)
      }
    )
  }
  ngOnDestroy(): void {
    this.routeparamssubscription.unsubscribe()
  }

  onAddtoShoppinglist(){
    this.recipieserv.addingredientstoshoppinglist(this.particular_recipie_to_display.ingredients_used);
  }
  onEditrecipieClicked(){
    this.router.navigate(['edit'],{relativeTo:this.routee});
  }
  ondeleterecipie(){
    this.recipieserv.deleterecipie(this.id)
    this.router.navigate(['/recipies'])
  }
}
