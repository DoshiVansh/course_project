import { NgModule } from '@angular/core';
import { RecipieDetailStartComponent } from './recipie-detail-start/recipie-detail-start.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipiesComponent } from './recipies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    RecipieDetailStartComponent,
    RecipieEditComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipiesRoutingModule
  ]
})
export class RecipiesModule { }
