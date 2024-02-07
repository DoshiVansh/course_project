import { Component,OnDestroy,OnInit} from '@angular/core';
import { recipies } from '../recipies.model';
import { recipiesService } from '../recipies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css'
})
export class RecipieListComponent implements OnInit,OnDestroy{
  recipiearray: recipies[];

  constructor(private recipieservice:recipiesService,private router:Router,private route:ActivatedRoute, private datastorageserv:DataStorageService){}

  ngOnInit(): void {
    /* added on my own to fetch recipies when the page loads.*/
    this.datastorageserv.fetchrecipies().subscribe()
    this.recipiearray = this.recipieservice.recipiearraycopy;
    this.recipieservice.recipieschanged.subscribe(
      (recipiesarr:recipies[]) => {
        this.recipiearray = recipiesarr;
      }
    )
  }
  ngOnDestroy(): void {
  }
  onNewrecipie(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

}
