import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { shoppinglistService } from './shopping-list/shopping-list.service';
import { recipiesService } from './recipies/recipies.service';
import { DataStorageService } from './shared/data-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule
  ],
  providers: [shoppinglistService,recipiesService,DataStorageService,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
