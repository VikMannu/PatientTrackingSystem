import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataList } from '../model/dataList';
import { ProductPresentation } from '../model/productPresentation';

@Injectable({
  providedIn: 'root',
})
export class ProductPresentationService {
  private api: string = '/stock-nutrinatalia/presentacionProducto';

  constructor(private http: HttpClient) {}
  getProducts(
    filter=[null,null],
    itemsPerPage: number,
    inicio: number
  ): Observable<DataList<ProductPresentation>> {
    const encode = encodeURIComponent(
      `{"nombre":${filter[1] != null ? `"${filter[1]}"` : null},"idProducto":{"idTipoProducto":{"idTipoProducto":${filter[0]}}}}`
    );
    console.log('El query enviado' + encode);
    // const url = `?like=S&ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idTipoProducto&orderDir=asc`;
    const url = `?like=S&ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idPresentacionProducto&orderDir=asc`;

    return this.http.get<DataList<ProductPresentation>>(this.api + url);
  }

  createProduct(c: ProductPresentation): Observable<ProductPresentation> {
    return this.http.post<ProductPresentation>(this.api, c).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }

  //eliminar la presentacion de un producto
  deletePres(idPresentacionProducto: number): Observable<ProductPresentation> {
    const url = `${this.api}/${idPresentacionProducto}`;
    return this.http.delete<ProductPresentation>(url).pipe(
      tap(
        // Log the result or error
        (data) => console.log(`Eliminado id=${idPresentacionProducto}`),
        (error) => console.log('error: ' + error)
      )
    );
  }
  //actualizar la presentacion de un producto
  updatePres(c: ProductPresentation): Observable<ProductPresentation> {
    const url = `${this.api}/${c.idPresentacionProducto}`;
    return this.http.put<ProductPresentation>(this.api, c).pipe(
      tap(
        // Log the result or error
        (data) => console.log('actualizado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }
}