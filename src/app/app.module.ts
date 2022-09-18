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
import { ServiceRegisterComponent } from './service-register/service-register.component';
import { ServiceRegisterService } from './service/service-register/service-register.service';
import { PatientManagementService } from './service/patient-management.service';
import { PatientReadComponent } from './patient-management/patient-read/patient-read.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AttentionScheduleComponent } from './attention-schedule/attention-schedule.component';
import { AttentionScheduleService } from './service/attention-schedule.service';
import {HorarioExcepcionService} from "./service/horario-excepcion.service";
import {ReservaService} from "./service/reserva.service";
import {ClinicalRecordService} from "./service/clinical-record.service";
import {ReportService} from "./service/report.service";
import {HorarioExcepcionComponent} from "./horario-excepcion/horario-excepcion.component";
import {ReportComponent} from "./report/report.component";
import {LoginComponent} from "./login/login.component";
import {ProductPresentationService} from "./service/product-presentation.service";
import {ProductPresentationComponent} from "./product-presentation/product-presentation.component";


@NgModule({
  declarations: [
    AppComponent,
    CategoryReadComponent,
    SubcategoriesManagementComponent,
    MenuComponent,
    ServiceRegisterComponent,
    PatientReadComponent,
    ReservaComponent,
    AttentionScheduleComponent,
    HorarioExcepcionComponent,
    ReportComponent,
    LoginComponent,
    ProductPresentationComponent
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
    ReportService,
    ProductPresentationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
