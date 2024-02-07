import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipieDetailStartComponent } from './recipie-detail-start/recipie-detail-start.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipiesResolverService } from './recipies-resolver.service';
import { RecipiesComponent } from './recipies.component';


const routes:Routes = [
  {path:'',canActivate:[AuthGuard],component:RecipiesComponent,children:[
    {path:'',component:RecipieDetailStartComponent},
    {path:'new',component:RecipieEditComponent},
    {path:':id',component:RecipieDetailComponent,resolve:[RecipiesResolverService]},
    {path:':id/edit',component:RecipieEditComponent,resolve:[RecipiesResolverService]}
  ]},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class RecipiesRoutingModule { }
