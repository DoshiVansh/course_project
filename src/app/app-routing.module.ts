import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'/recipies', pathMatch:'full'},
  {path:'recipies',loadChildren: ()=>import('./recipies/recipies.module').then(m => m.RecipiesModule)},
  {path:'shoppingList',loadChildren: ()=>import('./shopping-list/shopping-list.module')
  .then(m => m.ShoppingListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
