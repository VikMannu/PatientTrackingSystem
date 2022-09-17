import { Component, OnInit } from '@angular/core';
import {PatientManagementService} from "../service/patient-management.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReservaService} from "../service/reserva.service";
import {Reserva} from "../model/reserva.model";
import {ConfigPage} from "../model/configPage";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  formFilters!: FormGroup;
  reservas: Reserva[] = [];
  message: string = "";
  banIsFilter!: number;
  filter: any[] = [];
  config: ConfigPage = new ConfigPage();

  constructor(private serviceReserva: ReservaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formFilters = this.formBuilder.group({
      fechaDesde: null,
      fechaHasta: null,
      idEmpleado: null,
      idCliente: null
    });
    this.banIsFilter = 0;
    this.filter[0] = '';
    this.filter[1] = '';
    this.config.currentPage=1;
    this.getReservas();
  }

  getReservas(): void{
    let inicio = this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    this.serviceReserva.getReservas(this.config.itemsPerPage, inicio).subscribe(
      next => this.reservas = next.lista,
      error => console.log('No se puedieron obtener reservas')
    )
  }

  cleanFilter(): void {
    this.formFilters.reset();
    this.config.currentPage=1;
    this.banIsFilter=0
    this.getReservas()
  }


  changePage(page: number){
    this.config.currentPage=page;
    if(this.banIsFilter==0){
      this.getReservas();
    }else{
      // this.getFilterReservas();
    }
  }
}
