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
import { CategoryCreateComponent } from './category-management/category-create/category-create.component';
<<<<<<<<< Temporary merge branch 1
import { ServiceRegisterComponent } from './service-register/service-register.component';
import { ServiceRegisterService } from './service/service-register/service-register.service';
import { PatientManagementService } from './service/patient-management.service';
=========
import { PatientReadComponent } from './patient-management/patient-read/patient-read.component';
import {PatientManagementService} from "./service/patient-management.service";
import { ReservaComponent } from './reserva/reserva.component';
import { AttentionScheduleComponent } from './attention-schedule/attention-schedule.component';
import { AttentionScheduleService } from './service/attention-schedule.service';
>>>>>>>>> Temporary merge branch 2


@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    CategoryCreateComponent,
    SubcategoriesManagementComponent,
    MenuComponent,
<<<<<<<<< Temporary merge branch 1
    ServiceRegisterComponent
=========
    PatientReadComponent,
    ReservaComponent,
    PatientReadComponent,
    AttentionScheduleComponent
>>>>>>>>> Temporary merge branch 2
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
    PatientManagementService,
    AttentionScheduleService,
    HorarioExcepcionService,
    ServiceRegisterService,
    SubcategoryManagementService,
    AttentionScheduleService,
    ReservaService,
    ClinicalRecordService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
