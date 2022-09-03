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
  config: ConfigPage = new ConfigPage();
  //lista de  categorias existentes
  subcategories: Subcategory[] = [];
  message: string = '';
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private serviceSubcategory: SubcategoryManagementService,
    private formbuilber: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      descripcion: [''],
      categoria: ['']
    });
    this.config.currentPage = 1;
    this.getSubcategories();
  }
  //boton a mostrar en el form de relleno
  clickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
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
  deleteSubcategory(subcategory: Subcategory): void {
    this.serviceSubcategory.deleteSubcategory(subcategory.idTipoProducto).subscribe(
      () => {
        this.message = 'Eliminado exitosamente';
        this.getSubcategories();
      },
      (error) => console.log('error: ' + error)
    );
  }
  editSubcategory(subcat: Subcategory): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.subcategory.idTipoProducto=subcat.idTipoProducto;
    this.formValue.controls['descripcion'].setValue(subcat.descripcion);
    this.formValue.controls['categoria'].setValue(subcat.idCategoria.idCategoria);
  }
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
  changePage(page: number) {
    this.config.currentPage = page;
    this.getSubcategories();
  }
}
