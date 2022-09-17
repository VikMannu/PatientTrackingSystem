import { Component, OnInit } from '@angular/core';
import {PatientManagementService} from "../../service/patient-management.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Person} from "../../model/person";
import {ConfigPage} from "../../model/configPage";


@Component({
  selector: 'app-patient-read',
  templateUrl: './patient-read.component.html',
  styleUrls: ['./patient-read.component.css']
})
export class PatientReadComponent implements OnInit {

  formValue!: FormGroup;
  formFilters!: FormGroup;
  patients: Person[] = [];
  config: ConfigPage = new ConfigPage();
  patient: Person = new Person();
  filter: any[] = [];
  message: string = "";
  showAdd!: boolean;
  showUpdate!: boolean;
  banIsFilter!: number;

  constructor(private servicePatient: PatientManagementService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
    nombre : [''],
    apellido : [''],
    email : [''],
    telefono : [''],
    ruc : [''],
    cedula : [''],
    tipoPersona : [''],
    fechaNacimiento : ['']
    });
    this.banIsFilter = 0;
    this.filter[0] = '';
    this.filter[1] = '';
    this.config.currentPage=1;
    this.getPatients();

    this.formFilters = this.formBuilder.group({
      nombre : null,
      apellido : null,
      soloUsuariosDelSistema : null
    });

  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getPatients(): void{
    let inicio = this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    this.servicePatient.getPatients(this.config.itemsPerPage, inicio).subscribe(
      entity => this.patients = entity.lista,
      error => console.log('No se puedieron obtener pacientes')
    )
  }


  getFilterPatients(): void {
    let inicio = this.config.currentPage - 1;
    inicio = inicio*this.config.itemsPerPage;
    this.banIsFilter = 1;
    const filterPatients = this.getArrayFilterPatients();
    this.servicePatient
      .getFilterPatients(this.config.itemsPerPage, inicio, filterPatients)
      .subscribe(
        (entity) => (this.patients = entity.lista),
        (error) => console.log('No se pudo obtener lista filtrada de pacientes')
      );
  }

  clearFilter(): void {
    this.formFilters.reset();
    this.config.currentPage=1;
    this.banIsFilter=0
    this.getPatients()
  }

  getArrayFilterPatients(): any[] {
    const filterPatients: any[] = [];
    filterPatients[0] = this.formFilters.controls['nombre'].value?? null;
    filterPatients[1] = this.formFilters.controls['apellido'].value?? null;
    filterPatients[2] = this.formFilters.controls['soloUsuariosDelSistema'].value?? null;
    return filterPatients;
  }


  changePage(page: number){
    this.config.currentPage=page;
    if(this.banIsFilter==0){
      this.getPatients();
    }else{
      this.getFilterPatients();
    }
  }

  savePatient(): void {
    this.servicePatient.createPatient(this.patient).subscribe(
      () => {
        this.message = "Agregado exitosamente";
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getPatients();
      },
      error => console.log("error: ", error)
    );
  }

  deletePatient(patient: Person): void {
    this.servicePatient.deletePatient(patient.idPersona).subscribe(
      () => {
        this.message = 'Eliminado exitosamente'
        this.getPatients();
      },
      error => console.log("error: " + error)
    );
  }

  editPatient(pat: Person): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.patient.idPersona = pat.idPersona;
    this.formValue.controls['nombre'].setValue(pat.nombre);
    this.formValue.controls['apellido'].setValue(pat.apellido);
    this.formValue.controls['telefono'].setValue(pat.telefono);
    this.formValue.controls['email'].setValue(pat.email);
    this.formValue.controls['ruc'].setValue(pat.ruc);
    this.formValue.controls['cedula'].setValue(pat.cedula);
    this.formValue.controls['tipoPersona'].setValue(pat.tipoPersona);
    this.formValue.controls['fechaNacimiento'].setValue(pat.fechaNacimiento);
  }


  updatePatient(): void {
    this.servicePatient.updatePatient(this.patient).subscribe(
      () => {
        this.message='Actualizado exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getPatients();
      },
      error => console.log("error: "+error)
    );
  }

}
