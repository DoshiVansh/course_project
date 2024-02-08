import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';




bootstrapApplication(AppComponent,{providers:[
  importProvidersFrom(AppRoutingModule,HttpClientModule),
  {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}
]})