import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import { MenuComponent } from './menu/menu.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { SubcategoriesManagementComponent } from './subcategories-management/subcategories-management.component';

const routes: Routes = [
  {
    path: 'category-read',
    component: CategoryReadComponent
  },
  {
    path: 'subcategory-management',
    component: SubcategoriesManagementComponent
  }
  ,
  {
    path: 'product-presentation',
    component: ProductPresentationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
