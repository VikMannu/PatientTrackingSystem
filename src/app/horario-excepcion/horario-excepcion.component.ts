import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "../model/person";
import {PatientManagementService} from "../service/patient-management.service";
import {HorarioExcepcion} from "../model/horarioExcepcion";
import {ConfigPage} from "../model/configPage";
import {HorarioExcepcionService} from "../service/horario-excepcion.service";

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
  message: string = "";

  constructor(
    private horaExcepcionService: HorarioExcepcionService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      idEmployee: null,
      nameEmployee: null,
      dateStart: null
    })
    this.config.currentPage = 1;
    this.getClientAndEmployee();
    this.getExceptionSchedule();
    console.log(this.horariosExcepciones);
  }

  getClientAndEmployee():void{
    this.patientsService.getAllPersons().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.Employees =res.lista
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


  setModalOptionSelected(person:Person){

      this.formValue.controls['idEmployee'].setValue(person.idPersona);
      this.formValue.controls['nameEmployee'].setValue(person.nombre);

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

}
