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
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  services: Service[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  formValue!: FormGroup;
  agregarForm!: FormGroup;
  modalEmployee: boolean = false;
  modalClient: boolean = false;
  modalAgregarServicio: boolean = false;
  clientsAndEmployees: Person[] = [];
  clinicalRecords: FichaClinica[] = [];
  constructor(
    private serviceRegisterService: ServiceRegisterService,
    private serviceReportService:ReportService,
    private categoryService: CategoryManagementService,
    private subcategoryService: SubcategoryManagementService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getServices();
    this.getCategories();
    this.getSubcategories();
    this.getClientAndEmployee();
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
    });
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
    this.subcategoryService.getAllSubcategories().subscribe((res: any) => {
      if (res?.lista.length > 0) {
        this.subcategories = res.lista;
      }
    });
  }
  /**
   * Clear all inputs and reload the table
   */
  cleanFilters(): void {
    this.formValue.reset();
    this.getServices();
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
    //getting filters from form
    const filters = this.getFilters();

    //getting results from request
    this.serviceRegisterService.getService(filters).subscribe((res: any) => {
      if (res?.lista) {
        this.services = res.lista;

        //filter by categories and subcategories
        const category = this.formValue.get('category')?.value;
        const subcategory = this.formValue.get('subcategory')?.value;

        if (category || subcategory) {
          this.services = this.services.filter((value, index) => {
            let result = true;
            //filter category
            if (category) {
              result =
                value.idFichaClinica.idTipoProducto.idCategoria.idCategoria ==
                category;
            }

            //filter subcategory
            if (subcategory && result) {
              result =
                value.idFichaClinica.idTipoProducto.idTipoProducto ==
                subcategory;
            }

            return result;
          });
        }
      }
    });
  }
  getFilters():Array<any>{
    //replace format to all dates inputs
    const dateStart = this.formValue.get('dateStart')?.value;
    const dateEnd = this.formValue.get('dateEnd')?.value;

    return [
      dateStart != null ? dateStart.replaceAll('-','') :null,
      dateEnd != null ? dateEnd.replaceAll('-','') :null,
      this.formValue.get('idClient')?.value ?? null,
      this.formValue.get('idEmployee')?.value ?? null
    ]
  }
  title = 'angular-app';
  fileName= 'Reporte-servicios.xlsx';
  exportExcel() {
    /* pass here the table id */
    let element = document.getElementById('services-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public exportPdf(): void {
    let DATA: any = document.getElementById('services-table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Reporte.pdf');
    });
  }
}
