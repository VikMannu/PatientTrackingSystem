import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import {CategoryCreateComponent} from "./category-management/category-create/category-create.component";
import { MenuComponent } from './menu/menu.component';
import { SubcategoriesManagementComponent } from './subcategories-management/subcategories-management.component';
import {PatientReadComponent} from "./patient-management/patient-read/patient-read.component";
import {ReservaComponent} from "./reserva/reserva.component";

const routes: Routes = [
  {
    path: 'category-read',
    component: CategoryReadComponent
  },
  {
    path: 'category-create',
    component: CategoryCreateComponent
  }
  ,
  {
    path: 'subcategory-management',
    component: SubcategoriesManagementComponent
  },
  {
    path: 'patient-read',
    component: PatientReadComponent
  },
 {
    path: 'reserva',
    component: ReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
