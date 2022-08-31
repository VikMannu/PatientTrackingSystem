import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {CategoryManagementService} from "../../service/category-management/category-management.service";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  category: Category = new Category();
  message: string = "";
  constructor(private serviceCategory: CategoryManagementService) { }

  ngOnInit(): void { }

  save(): void{
    this.serviceCategory.createCategory(this.category).subscribe(
      () => {
        this.message='Agregado exitosamente'
      },
      error => console.log("error: "+error)
    );
  }
}
