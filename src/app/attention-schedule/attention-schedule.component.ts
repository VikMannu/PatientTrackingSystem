import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HorarioAtencion} from "../model/horarioAtencion";
import {ConfigPage} from "../model/configPage";
import {AttentionScheduleService} from "../service/attention-schedule.service";

@Component({
  selector: 'app-attention-schedule',
  templateUrl: './attention-schedule.component.html',
  styleUrls: ['./attention-schedule.component.css']
})
export class AttentionScheduleComponent implements OnInit {

  formValue!: FormGroup;
  formFilters!: FormGroup;
  attentionSchedules: HorarioAtencion[] = [];
  config: ConfigPage = new ConfigPage();
  horarioAtencion: HorarioAtencion = new HorarioAtencion();
  message: string = "";
  showAdd!: boolean;
  showUpdate!: boolean;
  banIsFilter!: number;

  constructor(private serviceAttentionSchedule: AttentionScheduleService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      idPersonaHorarioAgenda: null,
      dia: null,
      horaAperturaCadena: null,
      horaCierreCadena: null,
      intervaloMinutos: null,
      idEmpleado: null
    })
    this.banIsFilter = 0;
    this.config.currentPage = 1;
    this.getAttentionSchedule();

    this.formFilters = this.formBuilder.group({
      idEmpleado: null,
      dia: null,
    })

  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  changePage(page: number){
    this.config.currentPage=page;
    if(this.banIsFilter==0){
      this.getAttentionSchedule();
    }else{
      this.getFilterAttentionSchedule();
    }
  }


  getAttentionSchedule(): void{
    let inicio = this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    this.serviceAttentionSchedule.getAttentionSchedule(this.config.itemsPerPage, inicio).subscribe(
      entity => this.attentionSchedules = entity.lista,
      error => console.log("No se puedieron obtener horarios de atención")
    )
  }


  getFilterAttentionSchedule(): void{
    let inicio = this.config.currentPage - 1;
    inicio = inicio*this.config.itemsPerPage;
    this.banIsFilter = 1;
    const filterSchedule =this.getArrayFilterPatients();
    this.serviceAttentionSchedule
      .getFilterAttentionSchedule(this.config.itemsPerPage, inicio, filterSchedule)
      .subscribe(
        entity => (this.attentionSchedules = entity.lista),
        (error) => console.log('No se pudo obtener lista filtrada de horarios')
      );
  }


  clearFilter(): void {
    this.formFilters.reset();
    this.config.currentPage=1;
    this.banIsFilter=0
    this.getAttentionSchedule()
  }


  getArrayFilterPatients(): any[] {
    const filterSchedules: any[] = [];
    filterSchedules[0] = this.formFilters.controls['idEmpleado'].value?? null;
    filterSchedules[1] = this.formFilters.controls['dia'].value?? null;
    return filterSchedules;
  }



  saveSchedule(): void {
    console.log(this.horarioAtencion);
    this.serviceAttentionSchedule.createSchedule(this.horarioAtencion).subscribe(
      () => {
        this.message='Horario creado exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAttentionSchedule();
      },
      error => console.log("error: "+error)
    )
  }


  deleteSchedule(horario: HorarioAtencion): void {
    this.serviceAttentionSchedule.deleteSchedule(horario.idPersonaHorarioAgenda).subscribe(
      () => {
        this.message = 'Horario eliminado exitosamente'
        this.getAttentionSchedule();
      },
      error => console.log("error: " + error)
    );
  }

  editSchedule(horario: HorarioAtencion): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.horarioAtencion.idPersonaHorarioAgenda = horario.idPersonaHorarioAgenda;
    this.formValue.controls['dia'].setValue(horario.dia);
    this.formValue.controls['horaAperturaCadena'].setValue(horario.horaAperturaCadena);
    this.formValue.controls['horaCierreCadena'].setValue(horario.horaCierreCadena);
    this.formValue.controls['intervaloMinutos'].setValue(horario.intervaloMinutos);
    this.formValue.controls['idEmpleado'].setValue(horario.idEmpleado.idPersona);

  }

  updateSchedule(): void {
    console.log(this.horarioAtencion);
    this.serviceAttentionSchedule.updateSchedule(this.horarioAtencion).subscribe(
      () => {
        this.message='Horario actualizado exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAttentionSchedule();
      },
      error => console.log("error: "+error)
    )
  }


}
