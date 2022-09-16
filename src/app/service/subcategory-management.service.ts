import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataList } from '../model/dataList';
import { Subcategory } from '../model/subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryManagementService {
  private api: string = '/stock-nutrinatalia/tipoProducto';

  constructor(private http: HttpClient) {}

  getFilterSubcategories(
    filter: any[],
    itemsPerPage: number,
    inicio: number
  ): Observable<DataList<Subcategory>> {
    const encode = encodeURIComponent(
      `{
        "descripcion":${filter[1] != null ? `"${filter[1]}"` : null},
      "idCategoria":{"idCategoria":${filter[0]}}
    }`
    );
    console.log('El query enviado' + encode);
    const url = `?like=S&ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idTipoProducto&orderDir=asc`;
    return this.http.get<DataList<Subcategory>>(this.api + url);
  }

  getSubcategories(
    itemsPerPage: number,
    inicio: number
  ): Observable<DataList<Subcategory>> {
    const url = `?inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idTipoProducto&orderDir=asc`;

    return this.http.get<DataList<Subcategory>>(this.api + url);
  }

  getAllSubcategories(): Observable<DataList<Subcategory>> { 
    return this.http.get<DataList<Subcategory>>(this.api);
  }

  createSubcategory(c: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.api, c).pipe(
      tap(
        // Log the result or error
        (data) => console.log('agregado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }

  updateSubcategory(c: Subcategory): Observable<Subcategory> {
    const url = `${this.api}/${c.idTipoProducto}`;
    return this.http.put<Subcategory>(this.api, c).pipe(
      tap(
        // Log the result or error
        (data) => console.log('actualizado ' + data),
        (error) => console.log('error: ' + error)
      )
    );
  }

  deleteSubcategory(idTipoProducto: number): Observable<Subcategory> {
    const url = `${this.api}/${idTipoProducto}`;
    return this.http.delete<Subcategory>(url).pipe(
      tap(
        // Log the result or error
        (data) => console.log(`Eliminado id=${idTipoProducto}`),
        (error) => console.log('error: ' + error)
      )
    );
  }
}
