import { Component, OnInit } from '@angular/core';
import { Service } from '../model/serviceRegister';
import { ServiceRegisterService } from '../service/service-register/service-register.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from '../model/category';
import { Subcategory } from '../model/subcategory';
import { CategoryManagementService } from '../service/category-management/category-management.service';
import { SubcategoryManagementService } from '../service/subcategory-management.service';
import { Person } from '../model/person';
import { PatientManagementService } from '../service/patient-management.service';

@Component({
  selector: 'app-service-register',
  templateUrl: './service-register.component.html',
  styleUrls: ['./service-register.component.css']
})
export class ServiceRegisterComponent implements OnInit {

  services: Service[] =[];
  categories: Category[] =[];
  subcategories: Subcategory[] =[];
  formValue!: FormGroup;
  modalEmployee:boolean =false;
  modalClient:boolean =false;
  clientsAndEmployees: Person[] =[];
  constructor(
    private serviceRegisterService: ServiceRegisterService, 
    private categoryService: CategoryManagementService,
    private subcategoryService: SubcategoryManagementService,
    private patientsService: PatientManagementService,
    private formbuilber: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getServices();
    this.getCategories();
    this.getSubcategories();
    this.getClientAndEmployee();
  }

  getClientAndEmployee():void{
    this.patientsService.getAllPersons().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.clientsAndEmployees =res.lista 
      }
      // console.log(this.clientsAndEmployees);  
    });
  }
  initForm():void{
    this.formValue = this.formbuilber.group({
      idClient: null,
      idEmployee: null,
      nameClient: null,
      nameEmployee: null,
      dateStart: null,
      dateEnd: null,
      category: '',
      subcategory: ''
    });
  }
  getServices(){
    this.serviceRegisterService.getAllServices().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.services =res.lista 
      }
      // console.log(this.services);  
    });
  }

  getCategories():void{
    this.categoryService.getAllCategories().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.categories =res.lista 
      }
      // console.log(this.categories);
      
    })
  }

  getSubcategories():void{
    this.subcategoryService.getAllSubcategories().subscribe((res:any)=>{
      if(res?.lista.length > 0){
        this.subcategories =res.lista 
      }
      // console.log(this.subcategories);
      
    })
  }
  /**
   * Clear all inputs and reload the table
   */
  cleanFilters():void {

    this.formValue.reset();
    this.getServices();
    
  }

  /**
   * in order to show the difference titles we set what is the current modal active
   * @param typeModal  
   */
  showModal(typeModal:string):void{

    //reset all modals
    this.modalEmployee = false;
    this.modalClient = false;

    if(typeModal == 'searchEmployee'){
      this.modalEmployee =true;
    }

    if(typeModal == 'searchClient'){
      this.modalClient = true;  
    }
    
  }

  /**
   * save the option selected by the user when they make click on Seleccionar button on current modal
   */

   setModalOptionSelected(person:Person){
    
    if(this.modalClient){
      this.formValue.controls['idClient'].setValue(person.idPersona);
      this.formValue.controls['nameClient'].setValue(person.nombre);
    }
    if(this.modalEmployee){
      this.formValue.controls['idEmployee'].setValue(person.idPersona);
      this.formValue.controls['nameEmployee'].setValue(person.nombre);
    }
    
   }

   /**
    * search service using filters
    */
    search():void{
      //getting filters from form
      const filters = this.getFilters();
      
      //getting results from request
      this.serviceRegisterService.getService(filters).subscribe((res:any)=>{
        
        if(res?.lista){
          this.services = res.lista;

          //filter by categories and subcategories
          const category = this.formValue.get('category')?.value;
          const subcategory = this.formValue.get('subcategory')?.value;
          
          
          if(category || subcategory){
            
            this.services = this.services.filter((value,index)=>{
              let result = true;
              //filter category
              if(category){
                  result = value.idFichaClinica.idTipoProducto.idCategoria.idCategoria ==category;
              }

              //filter subcategory
              if (subcategory && result) {
                result = value.idFichaClinica.idTipoProducto.idTipoProducto == subcategory;
              }
              
              return result;
            });
            
          }
        }
        
      })
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
}
