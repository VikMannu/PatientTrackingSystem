import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import {CategoryCreateComponent} from "./category-management/category-create/category-create.component";
import {PatientsListComponent} from "./views/patients/patients-list/patients-list.component";

const routes: Routes = [
  {
    path: 'category-read',
    component: CategoryReadComponent
  },
  {
    path: 'category-create',
    component: CategoryCreateComponent
  },
  {
    path: 'patient-list',
    component: PatientsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
