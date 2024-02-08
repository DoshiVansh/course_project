import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { authService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone : true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterModule,DropdownDirective,CommonModule]
})
export class HeaderComponent implements OnInit,OnDestroy{
  
  isAuthenticated = false;
  private usersub:Subscription;
  constructor(private datastorageserv:DataStorageService,private authserv:authService){}

  ngOnInit(): void {
    this.usersub = this.authserv.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }
  ngOnDestroy(): void {
    this.usersub.unsubscribe()
  }

  onsavedata(){
    this.datastorageserv.storerecipies();
  }
  onfetchdata(){
    this.datastorageserv.fetchrecipies().subscribe();
  }
  onlogout(){
    this.authserv.logout()
  }
}
