import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone : true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent,RouterModule,HttpClientModule,CommonModule]

})
export class AppComponent implements OnInit {
  constructor(private authserv:authService){}
  ngOnInit(): void {
    this.authserv.autologin()
  }
}
