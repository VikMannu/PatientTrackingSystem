import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataList } from '../model/dataList';
import { Observable } from 'rxjs';
import { Service } from '../model/serviceRegister';
import { environment } from 'src/environments/environment';

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
    console.log('url',`${environment.baseUrlApi}/${this.fichaClinicaUrl}?ejemplo=${encodeUrl}`);
    
    return this.http.get<DataList<Service>>(`${environment.baseUrlApi}/${this.fichaClinicaUrl}?ejemplo=${encodeUrl}`)
  }

}

