import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CrearReservaService} from "../service/crear-reserva.service";
import {Person} from "../model/person";
import {PatientManagementService} from "../service/patient-management.service";
import {Reserva} from "../model/reserva.model";

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  formValue!: FormGroup;
  modalEmployee: boolean = false;
  modalClient: boolean = false;
  reservas: Reserva[] = [];
  employees: Person[] = []
  patients: Person[] = []
  clientsAndEmployees: Person[] = []
  employeeReserva: Person = new Person()
  patientReserva: Person = new Person()

  constructor(
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder,
    private serviceCrearReserva: CrearReservaService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.getClientAndEmployee()
  }

  initForm(): void {
    this.formValue = this.formbuilber.group({
      idClient: null,
      idEmployee: null,
      nameClient: null,
      nameEmployee: null,
      date: null,
      observacion: null
    });
  }

  /**
   * Clear all inputs and reload the table
   */
  cleanFilters(): void {
    this.formValue.reset();
  }

  /**
   * in order to show the difference titles we set what is the current modal active
   * @param typeModal
   */
  showModal(typeModal: string): void {

    //reset all modals
    this.modalEmployee = false;
    this.modalClient = false;

    if (typeModal == 'searchEmployee') {
      this.modalEmployee = true;
      this.clientsAndEmployees = this.employees
    }

    if (typeModal == 'searchClient') {
      this.modalClient = true;
      this.clientsAndEmployees = this.patients
    }

  }

  /**
   * save the option selected by the user when they make click on Seleccionar button on current modal
   */

  setModalOptionSelected(person: Person) {
    if (this.modalClient) {
      this.patientReserva = person
      this.formValue.controls['idClient'].setValue(person.idPersona);
      this.formValue.controls['nameClient'].setValue(`${person.nombre} ${person.apellido}`);
    }
    if (this.modalEmployee) {
      this.employeeReserva = person
      this.formValue.controls['idEmployee'].setValue(person.idPersona);
      this.formValue.controls['nameEmployee'].setValue(`${person.nombre} ${person.apellido}`);
    }
  }

  getClientAndEmployee(): void {
    this.getEmployees()
    this.getPatients()
  }

  getEmployees() {
    console.log("employee")
    this.patientsService.getPersons(true).subscribe({
      next: (entity) => this.employees = entity.lista,
      error: (error) => alert(error.message)
    })
  }

  getPatients() {
    this.patientsService.getPersons(false).subscribe({
      next: (entity) => this.patients = entity.lista,
      error: (error) => alert(error.message)
    })
  }

  search(): void {
    const filters = this.getFilters();

    if (filters[0] == null || this.employeeReserva.idPersona == null || this.patientReserva.idPersona == null) {
      alert("Llene los campos")
    } else {
      this.serviceCrearReserva.getAllHoursReservas(filters).subscribe({
        next: (entity) => this.reservas = entity,
        error: (error) => alert(error.message)
      })
    }
  }

  getFilters(): Array<any> {
    //replace format to all dates inputs
    const date = this.formValue.get('date')?.value

    return [
      date,
      this.employeeReserva.idPersona
    ]
  }

  setReserva(reserva: Reserva) {
    reserva.idEmpleado = new Person()
    reserva.idCliente = new Person()
    reserva.idEmpleado.idPersona = this.employeeReserva.idPersona
    reserva.idCliente.idPersona = this.patientReserva.idPersona
    reserva.observacion = this.formValue.get('observacion')?.value

    this.serviceCrearReserva.addReserva(reserva).subscribe({
      next: (entity) => console.log('agregado', entity),
      error: (error) => alert(error.message)
    })
    this.search()
  }
}
