import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { SubcategoriesManagementComponent } from './subcategories-management/subcategories-management.component';
import { ServiceRegisterComponent } from './service-register/service-register.component';

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
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'service-register',
    component:ServiceRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
