import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataList} from "../../model/dataList";
import {Observable, tap} from "rxjs";
import {Category} from "../../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {
  private api: string = "/stock-nutrinatalia/categoria";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<DataList<Category>> {
    return this.http.get<DataList<Category>>(this.api);
  }

  createCategory(c: Category): Observable<Category> {
    return this.http
      .post<Category>(this.api, c)
      .pipe(
        tap( // Log the result or error
          data => console.log('agregado ' + data),
          error => console.log("error: " + error)
        )
      );
  }
}
