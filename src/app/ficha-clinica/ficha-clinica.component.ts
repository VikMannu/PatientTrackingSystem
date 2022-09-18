import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../model/category';
import { FichaClinica } from '../model/fichaClinica';
import { Person } from '../model/person';
import { Service } from '../model/serviceRegister';
import { Subcategory } from '../model/subcategory';
import { CategoryManagementService } from '../service/category-management/category-management.service';
import { ClinicalRecordService } from '../service/clinical-record.service';
import { PatientManagementService } from '../service/patient-management.service';
import { ReportService } from '../service/report.service';
import { ServiceRegisterService } from '../service/service-register/service-register.service';
import { SubcategoryManagementService } from '../service/subcategory-management.service';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {
  services: Service[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  formValue!: FormGroup;
  formUpdate!: FormGroup;
  modalEmployee: boolean = false;
  modalClient: boolean = false;
  modalAgregarServicio: boolean = false;
  clientsAndEmployees: Person[] = [];
  clinicalRecords: FichaClinica[] = [];
  clinicalRecord: FichaClinica = new FichaClinica();
  message: string = "";

  constructor(
    private serviceRegisterService: ServiceRegisterService,
    private serviceReportService:ReportService,
    private categoryService: CategoryManagementService,
    private subcategoryService: SubcategoryManagementService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder,
    private clinicalRecordService: ClinicalRecordService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getServices();
    this.getCategories();
    this.getSubcategories();
    this.getClientAndEmployee();
    this.getClinicalRecords();
  }
  initForm(): void {
    this.formValue = this.formbuilber.group({
      idClient: null,
      idEmployee: null,
      nameClient: null,
      nameEmployee: null,
      dateStart: null,
      dateEnd: null,
      category: '',
      subcategory: '',
      date: null,
      motivo:null,
      diagnostico:null,
      obs:null,
    });
    this.formValue.controls['date'].setValue(new Date().toLocaleDateString());
    this.formUpdate = this.formbuilber.group({
      idFichaClinica: null,
      observacion: null,
    });
  }
  getClinicalRecords():void{
    this.clinicalRecordService.getClinicalRecord().subscribe((res:any)=>{
        if(res?.lista.length > 0){
          this.clinicalRecords = res.lista
        }
    })
  }
  getClientAndEmployee(): void {
    this.patientsService.getAllPersons().subscribe((res: any) => {
      if (res?.lista.length > 0) {
        this.clientsAndEmployees = res.lista;
      }
    });
  }
  getServices() {
    this.serviceRegisterService.getAllServices().subscribe((res: any) => {
      if (res?.lista.length > 0) {
        this.services = res.lista;
      }
    });
  }
  getCategories(): void {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      if (res?.lista.length > 0) {
        this.categories = res.lista;
      }
    });
  }

  getSubcategories(): void {
    //filter by categories and subcategories
    const idcategory = this.formValue.get('category')?.value;
    if (idcategory) {
      console.log('gettipoproductoslikeid ' + idcategory);
      this.subcategoryService
        .getSubcategoriesByCategory(idcategory)
        .subscribe({
          next: (entity) => {
            this.subcategories = entity.lista;
          },
          error: (error) =>
            console.log(
              'no se pudieron conseguir los productos con el filtro' +
                JSON.stringify(error)
            ),
        });
    }
  }
  /**
   * Clear all inputs and reload the table
   */
  cleanFilters(): void {
    this.formValue.reset();
    this.formValue.controls['date'].setValue(new Date().toLocaleDateString());

    this.getClinicalRecords();
  }
  showModal(typeModal: string): void {
    //reset all modals
    this.modalEmployee = false;
    this.modalClient = false;
    if (typeModal == 'searchEmployee') {
      this.modalEmployee = true;
    }

    if (typeModal == 'searchClient') {
      this.modalClient = true;
    }

  }
  setModalOptionSelected(person: Person) {
    if (this.modalClient) {
      this.formValue.controls['idClient'].setValue(person.idPersona);
      this.formValue.controls['nameClient'].setValue(person.nombre);
    }
    if (this.modalEmployee) {
      this.formValue.controls['idEmployee'].setValue(person.idPersona);
      this.formValue.controls['nameEmployee'].setValue(person.nombre);
    }
  }
  search(): void {
    const filters = this.getClinicalRecordsFilters();
    //getting results from request
    this.clinicalRecordService.getClinicalRecord(filters).subscribe((res: any) => {
      if (res?.lista) {
        this.clinicalRecords = res.lista;

        //filter by categories and subcategories
        const category = this.formValue.get('category')?.value;
        const subcategory = this.formValue.get('subcategory')?.value;

        if (category || subcategory) {
          this.clinicalRecords = this.clinicalRecords.filter((value, index) => {
            let result = true;
            //filter category
            if (category) {
              result =
                value.idTipoProducto.idCategoria.idCategoria ==
                category;
            }

            //filter subcategory
            if (subcategory && result) {
              result =
                value.idTipoProducto.idTipoProducto ==
                subcategory;
            }

            return result;
          });
        }
      }
    });
  }

  getClinicalRecordsFilters():Array<any>{
     //replace format to all dates inputs
     const dateStart = this.formValue.get('dateStart')?.value;
     const dateEnd = this.formValue.get('dateEnd')?.value;
     return [
       dateStart != null ? dateStart.replaceAll('-','') :null,
       dateEnd != null ? dateEnd.replaceAll('-','') :null,
      this.formValue.get('idEmployee')?.value ?? null,
      this.formValue.get('idClient')?.value ?? null,
      null
    ]
  }

  editRecord(ficha: FichaClinica){
    this.clinicalRecord.idFichaClinica= ficha.idFichaClinica;
    this.formUpdate.controls['observacion'].setValue(ficha.observacion);
  }

  updateRecord(): void {


    this.clinicalRecord.observacion = this.formUpdate.value.observacion;

    this.clinicalRecordService.updateRecord(this.clinicalRecord).subscribe(
      () => {
        this.message='Ficha actualizada exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formUpdate.reset();
        this.getClinicalRecords();
      },
      error => {console.log("error: " + error), alert(`Error ${error.error}`)}
    )
  }
  saveClinicalRecord(){
    this.clinicalRecord.idCliente = this.formValue.value.idClient;
    this.clinicalRecord.idEmpleado = this.formValue.value.idEmployee;
    this.clinicalRecord.idTipoProducto.idTipoProducto = this.formValue.value.subcategory;
    this.clinicalRecord.motivoConsulta = this.formValue.value.motivo;
    this.clinicalRecord.diagnostico = this.formValue.value.diagnostico;
    this.clinicalRecord.observacion = this.formValue.value.obs;
    this.clinicalRecordService.createRecord(this.clinicalRecord).subscribe(
      () => {
        this.message='Ficha creada exitosamente';
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getClinicalRecords();
      },
      error => {console.log("error: " + error), alert(`Error ${error.error}`)}
    )
  }
}
