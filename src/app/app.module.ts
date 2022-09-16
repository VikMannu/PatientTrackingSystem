import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryReadComponent } from './category-management/category-read/category-read.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryManagementService} from "./service/category-management/category-management.service";
import { MenuComponent } from './menu/menu.component';
import { SubcategoriesManagementComponent } from './subcategories-management/subcategories-management.component';
import { SubcategoryManagementService } from './service/subcategory-management.service';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { LoginComponent } from './login/login.component';
import { ServiceRegisterComponent } from './service-register/service-register.component';
import { ServiceRegisterService } from './service/service-register/service-register.service';
import { PatientManagementService } from './service/patient-management.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    SubcategoriesManagementComponent,
    ProductPresentationComponent,
    MenuComponent,
    ServiceRegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryManagementService,
    SubcategoryManagementService,
    ServiceRegisterService,
    PatientManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
