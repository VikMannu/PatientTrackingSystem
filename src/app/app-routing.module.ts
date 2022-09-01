import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import {CategoryCreateComponent} from "./category-management/category-create/category-create.component";
import { CategoryUpdateComponent } from './category-management/category-update/category-update.component';
import { CategoryDeleteComponent } from './category-management/category-delete/category-delete.component';

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
    path: 'category-update',
    component: CategoryUpdateComponent
  },
  {
    path: 'category-delete',
    component: CategoryDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
