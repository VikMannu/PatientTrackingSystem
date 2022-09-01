import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryReadComponent } from './category-management/category-read/category-read.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CategoryManagementService} from "./service/category-management/category-management.service";
import { CategoryCreateComponent } from './category-management/category-create/category-create.component';
import { CategoryUpdateComponent } from './category-management/category-update/category-update.component';
import { CategoryDeleteComponent } from './category-management/category-delete/category-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CategoryManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
