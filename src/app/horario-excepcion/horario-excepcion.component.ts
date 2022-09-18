import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "../model/person";
import {PatientManagementService} from "../service/patient-management.service";
import {HorarioExcepcion} from "../model/horarioExcepcion";
import {ConfigPage} from "../model/configPage";
import {HorarioExcepcionService} from "../service/horario-excepcion.service";
import {HorarioAtencion} from "../model/horarioAtencion";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-horario-excepcion',
  templateUrl: './horario-excepcion.component.html',
  styleUrls: ['./horario-excepcion.component.css']
})
export class HorarioExcepcionComponent implements OnInit {

  formValue!: FormGroup;
  config: ConfigPage = new ConfigPage();
  modalEmployee:boolean =false;
  Employees: Person[] =[];
  horariosExcepciones: HorarioExcepcion[] = [];
  horarioExcepcion: HorarioExcepcion = new HorarioExcepcion();
  message: string = "";
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private horaExcepcionService: HorarioExcepcionService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      idEmployee: null,
      dateStart: null,
      idEmpleado: null,
      idHorarioExcepcion: null,
      fechaCadena: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      intervaloMinutos: null,
      flagEsHabilitar: null
    })
    this.config.currentPage = 1;
    this.getClientAndEmployee();
    this.getExceptionSchedule();
    console.log(this.horariosExcepciones);
  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getClientAndEmployee():void{
    this.patientsService.getAllPersons().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.Employees = res.lista
      }
      // console.log(this.clientsAndEmployees);
    });
  }

  cleanFilters():void {

    this.formValue.reset();
    this.getExceptionSchedule();

  }

  filtrar():void{
    this.config.currentPage = 1;
    this.search();
  }

  changePage(page: number){
    this.config.currentPage=page;
    this.search();
  }

  getExceptionSchedule(): void{
    let inicio = this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    this.horaExcepcionService.getExceptionSchedule(this.config.itemsPerPage, inicio).subscribe(
      entity => this.horariosExcepciones = entity.lista,
      error => console.log("No se puedieron obtener horarios de excepción")
    )
  }


  saveSchedule(): void {

    this.horarioExcepcion.fechaCadena = this.formValue.value.fechaCadena;
    this.horarioExcepcion.horaAperturaCadena = this.formValue.value.horaAperturaCadena;
    this.horarioExcepcion.horaCierreCadena = this.formValue.value.horaCierreCadena;
    this.horarioExcepcion.intervaloMinutos = this.formValue.value.intervaloMinutos;
    this.horarioExcepcion.flagEsHabilitar = this.formValue.value.flagEsHabilitar;
    this.horarioExcepcion.idEmpleado.idPersona = this.formValue.value.idEmpleado;

    console.log(this.horarioExcepcion);
    this.horaExcepcionService.createExceptionSchedule(this.horarioExcepcion).subscribe(
      () => {
        this.message='Horario Excepcional creado exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getExceptionSchedule();
      },
      error => console.log("error: "+error)
    )
  }



  search():void{
    //getting filters from form
    const filters = this.getFilters();
    let inicio = this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;

    //getting results from request
    this.horaExcepcionService.getExceptionSchedule(this.config.itemsPerPage, inicio, filters).subscribe((res:any)=>{

      if(res?.lista){
        this.horariosExcepciones = res.lista;
      }
    })
  }

  getFilters():Array<any>{
    //replace format to all dates inputs
    const dateStart = this.formValue.get('dateStart')?.value;
    console.log(dateStart);

    return [
      dateStart != null ? dateStart.replaceAll('-','') :null,
      this.formValue.get('idEmployee')?.value ?? null
    ]
  }

  editSchedule(horario: HorarioExcepcion): void {
    this.showAdd = false;
    this.showUpdate = true;

    this.horarioExcepcion.idHorarioExcepcion = horario.idHorarioExcepcion;
    this.formValue.controls['fechaCadena'].setValue(horario.fechaCadena);
    this.formValue.controls['horaAperturaCadena'].setValue(horario.horaAperturaCadena);
    this.formValue.controls['horaCierreCadena'].setValue(horario.horaCierreCadena);
    this.formValue.controls['intervaloMinutos'].setValue(horario.intervaloMinutos);
    this.formValue.controls['idEmpleado'].setValue(horario.idEmpleado.idPersona);
    this.formValue.controls['flagEsHabilitar'].setValue(horario.flagEsHabilitar);

  }

  updateSchedule(): void {

    this.horarioExcepcion.fechaCadena = this.formValue.value.fechaCadena;
    this.horarioExcepcion.horaAperturaCadena = this.formValue.value.horaAperturaCadena;
    this.horarioExcepcion.horaCierreCadena = this.formValue.value.horaCierreCadena;
    this.horarioExcepcion.intervaloMinutos = this.formValue.value.intervaloMinutos;
    this.horarioExcepcion.flagEsHabilitar = this.formValue.value.flagEsHabilitar;
    this.horarioExcepcion.idEmpleado.idPersona = this.formValue.value.idEmpleado;

    this.horaExcepcionService.updateExceptionalSchedule(this.horarioExcepcion).subscribe(
      () => {
        this.message='Horario actualizado exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getExceptionSchedule();
      },
      error => console.log("error: "+error)
    )
  }

  deleteSchedule(horario: HorarioExcepcion): void {
    this.horaExcepcionService.deleteSExceptionSchedule(horario.idHorarioExcepcion).subscribe(
      () => {
        this.message = 'Horario eliminado exitosamente'
        this.getExceptionSchedule();
      },
      error => {console.log("error: " + error), alert(`Error ${error.error}`)}
    );
  }
}

