import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryReadComponent } from './category-management/category-read/category-read.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {CategoryManagementService} from "./service/category-management/category-management.service";
import { CategoryCreateComponent } from './category-management/category-create/category-create.component';
import {PatientsListComponent} from "./views/patients/patients-list/patients-list.component";

@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    CategoryCreateComponent,
    PatientsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CategoryManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
