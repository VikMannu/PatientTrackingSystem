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
import { PatientReadComponent } from './patient-management/patient-read/patient-read.component';
import {PatientManagementService} from "./service/patient-management.service";
import { ReservaComponent } from './reserva/reserva.component';
import { AttentionScheduleComponent } from './attention-schedule/attention-schedule.component';
import { AttentionScheduleService } from './service/attention-schedule.service';
import { HorarioExcepcionComponent } from './horario-excepcion/horario-excepcion.component';
import { HorarioExcepcionService } from './service/horario-excepcion.service';
import { ClinicalRecordService } from './service/clinical-record.service';
import { ServiceRegisterService } from './service/service-register/service-register.service';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { LoginComponent } from './login/login.component';
import { ServiceRegisterComponent } from './service-register/service-register.component';
import { ReportComponent } from './report/report.component';
import { ReportService } from './service/report.service';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    SubcategoriesManagementComponent,
    MenuComponent,
    PatientReadComponent,
    ReservaComponent,
    PatientReadComponent,
    AttentionScheduleComponent,
    HorarioExcepcionComponent,
    ProductPresentationComponent,
    MenuComponent,
    ServiceRegisterComponent,
    LoginComponent,
    ReportComponent,
    FichaClinicaComponent
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
    PatientManagementService,
    ClinicalRecordService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
