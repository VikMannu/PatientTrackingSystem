import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataList } from '../model/dataList';
import { ProductPresentation } from '../model/productPresentation';

@Injectable({
  providedIn: 'root'
})
export class ProductPresentationService {
  private api: string = "/stock-nutrinatalia/presentacionProducto";

  constructor(private http: HttpClient) {
  }

  getProducts( inicio:number): Observable<DataList<ProductPresentation>> {
    const url= `${this.api}?inicio=${inicio}&cantidad=13&orderBy=idPresentacionProducto&orderDir=asc`;

    return this.http.get<DataList<ProductPresentation>>(url);
  }

  createProduct(c: ProductPresentation): Observable<ProductPresentation> {
    return this.http
      .post<ProductPresentation>(this.api, c)
      .pipe(
        tap( // Log the result or error
          data => console.log('agregado ' + data),
          error => console.log("error: " + error)
        )
      );
  }

}
