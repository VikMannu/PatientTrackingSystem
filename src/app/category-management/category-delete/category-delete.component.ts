import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryManagementService } from 'src/app/service/category-management/category-management.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categories: Category[] = [];
  category: Category = new Category();
  message: string = "";
  constructor(private serviceCategory: CategoryManagementService) { }

  ngOnInit(): void {
    this.serviceCategory.getCategories().subscribe(
    entity => this.categories = entity.lista,
    error => console.log('no se pudieron conseguir las categorias')
  );}

  delete(category: Category): void{
    this.categories = this.categories.filter(h => h !== category);
    this.serviceCategory.deleteCategory(category.idCategoria).subscribe(
      () => {
        this.message='Eliminado exitosamente'
      },
      error => console.log("error: "+error)
    );
  }
}
