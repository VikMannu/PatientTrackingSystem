import {Component, OnInit} from '@angular/core';
import {PatientManagementService} from "../service/patient-management.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReservaService} from "../service/reserva.service";
import {Reserva} from "../model/reserva.model";
import {ConfigPage} from "../model/configPage";
import {CategoryManagementService} from "../service/category-management/category-management.service";
import {SubcategoryManagementService} from "../service/subcategory-management.service";
import {Person} from "../model/person";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  formValue!: FormGroup;
  formUpdate!: FormGroup;
  modalEmployee: boolean = false;
  modalClient: boolean = false;
  reservas: Reserva[] = [];
  message: string = "";
  banIsFilter!: number;
  filter: any[] = [];
  config: ConfigPage = new ConfigPage();
  reservaUpdate: Reserva = new Reserva()
  employees: Person[] = []
  patients: Person[] = []
  clientsAndEmployees: Person[] = []

  constructor(
    private categoryService: CategoryManagementService,
    private subcategoryService: SubcategoryManagementService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder,
    private serviceReserva: ReservaService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.banIsFilter = 0;
    this.filter[0] = '';
    this.filter[1] = '';
    this.config.currentPage = 1;
    this.getReservas();
    this.getClientAndEmployee()
  }

  initForm(): void {
    this.formValue = this.formbuilber.group({
      idClient: null,
      idEmployee: null,
      nameClient: null,
      nameEmployee: null,
      dateStart: null,
      dateEnd: null
    });

    this.formUpdate = this.formbuilber.group({
      idReserva: null,
      observacion: null,
      flagAsistio: null
    })
  }

  getReservas(): void {
    let inicio = this.config.currentPage - 1;
    inicio = inicio * this.config.itemsPerPage;
    this.serviceReserva.getAllReservas(this.config.itemsPerPage, inicio).subscribe(
      (res: any) => {
        if (res?.lista.length > 0) {
          const aux = res.lista;
          const date = formatDate(new Date(), 'yyyy-mm-dd', 'en-US').replace('-', '').replace('-', '')
          console.log(date);
          this.reservas = aux.filter((value: { fechaCadena: string; }) => value.fechaCadena == date);
        }
      }
    )
  }

  /**
   * Clear all inputs and reload the table
   */
  cleanFilters(): void {

    this.formValue.reset();
    this.config.currentPage = 1;
    this.banIsFilter = 0
    this.getReservas()
    this.getClientAndEmployee()

  }

  changePage(page: number) {
    this.config.currentPage = page;
    if (this.banIsFilter == 0) {
      this.getReservas();
    } else {
      // this.getFilterReservas();
    }
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
      this.formValue.controls['idClient'].setValue(person.idPersona);
      this.formValue.controls['nameClient'].setValue(`${person.nombre} ${person.apellido}`);
    }
    if (this.modalEmployee) {
      this.formValue.controls['idEmployee'].setValue(person.idPersona);
      this.formValue.controls['nameEmployee'].setValue(`${person.nombre} ${person.apellido}`);
    }

  }

  /**
   * search service using filters
   */
  search(): void {
    //getting filters from form
    const filters = this.getFilters();

    console.log(filters)

    //getting results from request
    let inicio = this.config.currentPage - 1;
    inicio = inicio * this.config.itemsPerPage;
    this.serviceReserva.getReserva(filters, this.config.itemsPerPage, inicio).subscribe(
      next => this.reservas = next.lista,
      error => console.log('No se puedieron obtener reservas')
    )
  }

  getFilters(): Array<any> {
    //replace format to all dates inputs
    const dateStart = this.formValue.get('dateStart')?.value;
    const dateEnd = this.formValue.get('dateEnd')?.value;

    return [
      this.formValue.get('idEmployee')?.value ?? null,
      dateStart != null ? dateStart.replaceAll('-', '') : null,
      dateEnd != null ? dateEnd.replaceAll('-', '') : null,
      this.formValue.get('idClient')?.value ?? null
    ]
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

  cancelarReserva(id: String) {
    this.serviceReserva.deleteReserva(id).subscribe({
      next: (entity) => console.log('reserva borrada', entity),
      error: (error) => console.log('no se pudo borrar la reserva', error),
    });
    this.ngOnInit()
  }

  setIDReserva(idReserva: String) {
    this.serviceReserva.getUniqueReseva(idReserva).subscribe({
        next: (entity) => {
          this.reservaUpdate = entity
          console.log(this.reservaUpdate)
          this.formUpdate.controls['idReserva'].setValue(entity.idReserva)
          this.formUpdate.controls['observacion'].setValue(entity.observacion)
          this.formUpdate.controls['flagAsistio'].setValue(entity.flagAsistio)
        },
        error: (error) => console.log('no se pudo borrar la reserva', error)
    })
  }

  updateObservacion() {
    let updateObs = new UpdateObservacion()
    this.reservaUpdate.observacion = this.formUpdate.get('observacion')?.value
    this.reservaUpdate.flagAsistio = this.formUpdate.get('flagAsistio')?.value

    updateObs.idReserva = this.reservaUpdate.idReserva
    updateObs.observacion = this.reservaUpdate.observacion
    updateObs.flagAsistio = this.reservaUpdate.flagAsistio
    console.log(updateObs)
    this.serviceReserva.updateReserva(updateObs).subscribe({
      next: (entity) => console.log('actualizado', entity),
      error: (error) => alert(error.message)
    });
  }
}

class UpdateObservacion {
  idReserva!: String
  observacion!: String
  flagAsistio!: String
}
