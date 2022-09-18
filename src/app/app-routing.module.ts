import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryReadComponent} from "./category-management/category-read/category-read.component";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';
import { SubcategoriesManagementComponent } from './subcategories-management/subcategories-management.component';
import {PatientReadComponent} from "./patient-management/patient-read/patient-read.component";
import {AttentionScheduleComponent} from "./attention-schedule/attention-schedule.component";
import {ReservaComponent} from "./reserva/reserva.component";
import { ServiceRegisterComponent } from './service-register/service-register.component';
import {HorarioExcepcionComponent} from "./horario-excepcion/horario-excepcion.component";
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'category-read',
    component: CategoryReadComponent
  },
  {
    path: 'subcategory-management',
    component: SubcategoriesManagementComponent
  },
  {
    path: 'patient-read',
    component: PatientReadComponent
  },
  {
    path: 'attention-schedule',
    component: AttentionScheduleComponent
  }, {
    path: 'reserva',
    component: ReservaComponent
  },
  {
    path: 'horario-excepcion',
    component: HorarioExcepcionComponent
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
  },
  {
    path: 'menu',
    component: MenuComponent
  },
 {
    path: 'reserva',
    component: ReservaComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
