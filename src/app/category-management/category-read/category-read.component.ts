import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {CategoryManagementService} from "../../service/category-management/category-management.service";

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.css']
})
export class CategoryReadComponent implements OnInit {
  categories: Category[] = [];

  constructor(private serviceCategory: CategoryManagementService) { }

  ngOnInit(): void {
    this.serviceCategory.getCategories().subscribe(
      entity => this.categories = entity.lista,
      error => console.log('no se pudieron conseguir las categorias')
    );
  }

}
