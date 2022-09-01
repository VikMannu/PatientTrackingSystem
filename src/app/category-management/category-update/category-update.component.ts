import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryManagementService } from 'src/app/service/category-management/category-management.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  category: Category = new Category();
  message: string = "";
  constructor(private serviceCategory: CategoryManagementService) { }

  ngOnInit(): void { }

  update(): void{
    this.serviceCategory.updateCategory(this.category).subscribe(
      () => {
        this.message='Actualizado exitosamente'
      },
      error => console.log("error: "+error)
    );
  }
}



