import { Component, OnInit } from '@angular/core';
import { recipiesService } from './recipies.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  providers:[]
})
export class RecipiesComponent implements OnInit {
  ngOnInit(): void {
  }
}
