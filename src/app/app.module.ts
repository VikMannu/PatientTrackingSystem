import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryReadComponent } from './category-management/category-read/category-read.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CategoryManagementService} from "./service/category-management/category-management.service";
import { CategoryCreateComponent } from './category-management/category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    CategoryCreateComponent
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
