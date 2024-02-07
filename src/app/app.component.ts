import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authserv:authService){}
  ngOnInit(): void {
    this.authserv.autologin()
  }
}
