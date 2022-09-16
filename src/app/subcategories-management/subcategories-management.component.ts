import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigPage } from '../model/configPage';
import { Subcategory } from '../model/subcategory';
import { SubcategoryManagementService } from '../service/subcategory-management.service';

@Component({
  selector: 'app-subcategories-management',
  templateUrl: './subcategories-management.component.html',
  styleUrls: ['./subcategories-management.component.css'],
})
export class SubcategoriesManagementComponent implements OnInit {
  formValue!: FormGroup;
  subcategory: Subcategory = new Subcategory();
  subcategorySearchDesc: Subcategory = new Subcategory();
  filter:any[]=[];
  subcategorySearchId: Subcategory = new Subcategory();
  config: ConfigPage = new ConfigPage();
  //lista de  categorias existentes
  subcategories: Subcategory[] = [];
  message: string = '';
  showAdd!: boolean;
  showUpdate!: boolean;
  banIsFilter!:number;
  constructor(
    private serviceSubcategory: SubcategoryManagementService,
    private formbuilber: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      descripcion: [''],
      categoria: [''],
      filterIdInput:null,
      filterDescInput:null,
    });
    this.banIsFilter=0;
    this.filter[0]='';
    this.filter[1]='';
    this.config.currentPage = 1;
    this.getSubcategories();
  }
  //boton a mostrar en el form de relleno
  clickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  //funcion para agregar una subcategoria
  saveSubcategory(): void {
    this.subcategory.descripcion=this.formValue.value.descripcion;
    this.subcategory.idCategoria.idCategoria=this.formValue.value.categoria;
    this.serviceSubcategory.createSubcategory(this.subcategory).subscribe(
      () => {
        this.message = 'Agregado exitosamente';
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getSubcategories();
      },
      (error) => console.log('error: ' + error)
    );
  }
  //funcion para obtener todas las subcategorias
  getSubcategories(): void {
    let inicio = this.config.currentPage - 1;
    inicio = inicio * this.config.itemsPerPage;
    this.serviceSubcategory
      .getSubcategories(this.config.itemsPerPage, inicio)
      .subscribe(
        (entity) => (this.subcategories = entity.lista),
        (error) => console.log('no se pudieron conseguir las categorias')
      );
  }
  //funcion para obtener los valores de los filtros
  getFilter(){
    return[
      this.formValue.get('filterIdInput')?.value ?? null,
      this.formValue.get('filterDescInput')?.value ?? null
    ];
  }
  //funcion para filtrar por id o descripcion
  getFilterSubcategories():void{
    let inicio = this.config.currentPage - 1;
    inicio = inicio * this.config.itemsPerPage;
    const filters=this.getFilter();
    this.serviceSubcategory
    .getFilterSubcategories(filters,this.config.itemsPerPage, inicio)
    .subscribe(
      (entity) => (this.subcategories = entity.lista),
      (error) => console.log('no se pudieron conseguir las categorias filtradas')
    );
  }
  //funcion para paginar
  filtrar(){
    this.config.currentPage=1;
    this.getFilterSubcategories();
  }
  //funcion para filtrar por id o descripcion
  cleanFilters():void {
    this.config.currentPage=1;
    this.formValue.reset();
    this.getSubcategories();
  }

  //funcion para eliminar una subcategoria
  deleteSubcategory(subcat: Subcategory): void {
    this.serviceSubcategory.deleteSubcategory(subcat.idTipoProducto).subscribe(
      () => {
        this.message = 'Eliminado exitosamente';
        this.getSubcategories();
      },
      (error) => console.log('error: ' + error)
    );
  }
  //funcion para mostrar los valores de la subcategoria a actualizar
  editSubcategory(subcat: Subcategory): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.subcategory.idTipoProducto=subcat.idTipoProducto;
    this.formValue.controls['descripcion'].setValue(subcat.descripcion);
    this.formValue.controls['categoria'].setValue(subcat.idCategoria.idCategoria);
  }
  //funcion para actualizar una subcategoria
  updateSubcategory(): void{
    this.subcategory.descripcion=this.formValue.value.descripcion;
    this.subcategory.idCategoria.idCategoria=this.formValue.value.categoria;
    this.serviceSubcategory.updateSubcategory(this.subcategory).subscribe(
      () => {
        this.message='Actualizado exitosamente'
        let ref=document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getSubcategories();
      },
      error => console.log("error: "+error)
    );
  }
  //funcion para paginar
  changePage(page: number) {
    this.config.currentPage = page;
    this.getFilterSubcategories();
  }

}
