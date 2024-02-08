import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipieDetailStartComponent } from './recipies/recipie-detail-start/recipie-detail-start.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { RecipieDetailComponent } from './recipies/recipie-detail/recipie-detail.component';
import { RecipiesResolverService } from './recipies/recipies-resolver.service';


const routes: Routes = [
  {path:'', redirectTo:'/recipies', pathMatch:'full'},
  {path:'auth',component:AuthComponent},
  {path:'shopping-list', loadComponent: () => import('./shopping-list/shopping-list.component').then((cmp)=> cmp.ShoppingListComponent)},
  {path:'recipies',canActivate:[AuthGuard],loadComponent: () => import('./recipies/recipies.component').then((cmp)=> cmp.RecipiesComponent),children:[
    {path:'',component:RecipieDetailStartComponent},
    {path:'new',component:RecipieEditComponent},
    {path:':id',component:RecipieDetailComponent,resolve:[RecipiesResolverService]},
    {path:':id/edit',component:RecipieEditComponent,resolve:[RecipiesResolverService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
