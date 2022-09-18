import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataList } from '../model/dataList';
import { Observable,tap } from 'rxjs';
import { Service } from '../model/serviceRegister';
import { environment } from 'src/environments/environment';
import { FichaClinica } from '../model/fichaClinica';

@Injectable({
  providedIn: 'root'
})
export class ClinicalRecordService {

  fichaClinicaUrl:string='fichaClinica';


  constructor(private http: HttpClient) { }

  /**
   * @param filters
   * @returns DataList<Service>
   * the values of the filter should to have the next order (mandatory):
   *  [fechaDesdeCadena,fechaHastaCadena,idEmpleado,idTipoProducto]
   *  if you don't have some of these values just sent null e.g [null,fechaHastaCadena,null,null]
   */
  getClinicalRecord(filters =[null,null,null,null,null]):Observable<DataList<Service>>{

    const encodeUrl = encodeURIComponent(
      `{
        "fechaDesdeCadena":${filters[0] != null ? `"${filters[0]}"`:null},
        "fechaHastaCadena":${filters[1] != null ? `"${filters[1]}"`:null},
        "idEmpleado":{"idPersona":${filters[2]}},
        "idCliente":{"idPersona":${filters[3]}},
        "idTipoProducto":{"idTipoProducto":${filters[4]}}
      }`
      )
    console.log('url',`${environment.baseUrlApi}/${this.fichaClinicaUrl}?ejemplo=${encodeUrl}&orderBy=idFichaClinica&orderDir=desc`);

    return this.http.get<DataList<Service>>(`${environment.baseUrlApi}/${this.fichaClinicaUrl}?ejemplo=${encodeUrl}&orderBy=idFichaClinica&orderDir=desc`)
  }

  updateRecord(h: FichaClinica): Observable<FichaClinica>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });
    let options = { headers: headers };
    return this.http.put<FichaClinica>(`${environment.baseUrlApi}/${this.fichaClinicaUrl}`, h, options).pipe(
      tap({
        next: (data) => {console.log(`creado id=${h.idFichaClinica}`),alert("Actualizado exitosamente")},
        error: (error) => console.log('error: ' + error)
      })
    );
  }
  createRecord(h: FichaClinica): Observable<FichaClinica>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });
    let options = { headers: headers };
    return this.http.post<FichaClinica>(`${environment.baseUrlApi}/${this.fichaClinicaUrl}`, h, options).pipe(
      tap({
        next: (data) => {console.log(`creado id=${h.idFichaClinica}`),alert("Creado exitosamente")},
        error: (error) => console.log('error: ' + error)
      })
    );
  }

}

