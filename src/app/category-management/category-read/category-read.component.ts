
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {Category} from "../../model/category";
import {CategoryManagementService} from "../../service/category-management/category-management.service";

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {
  formValue !: FormGroup;
  category: Category = new Category();
  //lista de  categorias existentes
  categories: Category[] = [];
  message: string = "";
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private serviceCategory: CategoryManagementService, private forbuilber: FormBuilder) { }

  ngOnInit(): void {
    this.formValue=this.forbuilber.group({
      descripcion : ['']
    });
    this.getCategories();
  }
  //boton a mostrar en el form de relleno
  clickAdd(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  saveCategory(): void{
    this.serviceCategory.createCategory(this.category).subscribe(
      () => {
        this.message='Agregado exitosamente'
        let ref=document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getCategories();
      },
      error => console.log("error: "+error)
    );
  }
  getCategories():void{
    this.serviceCategory.getCategories().subscribe(
      entity => this.categories = entity.lista,
      error => console.log('no se pudieron conseguir las categorias')
    );
  }
  deleteCategory(category: Category): void{
    this.serviceCategory.deleteCategory(category.idCategoria).subscribe(
      () => {
        this.message='Eliminado exitosamente'
        this.getCategories();

      },
      error => console.log("error: "+error)
    );
  }
  editCategory(category: Category): void{
    this.showAdd=false;
    this.showUpdate=true;
    this.formValue.controls['descripcion'].setValue(category.descripcion);

  }
  updateCategory(): void{
    this.serviceCategory.updateCategory(this.category).subscribe(
      () => {
        this.message='Actualizado exitosamente'
        this.getCategories();
      },
      error => console.log("error: "+error)
    );
  }
}
