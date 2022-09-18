import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DataList } from '../../model/dataList';
import { Service } from 'src/app/model/serviceRegister';

@Injectable({
  providedIn: 'root'
})
export class ServiceRegisterService {
  serviceUrl:string='servicio';

  constructor(private http: HttpClient) { }

  getAllServices():Observable<DataList<Service>>{
    return this.http.get<DataList<Service>>(`${environment.baseUrlApi}/${this.serviceUrl}`)
  }

  /**
   * @param filters 
   * @returns DataList<Service>
   * the values of the filter should to have the next order (mandatory):
   *  [fechaDesdeCadena,fechaHastaCadena,idCliente,idEmpleado]
   *  if you don't have some of these values just sent null e.g [null,fechaHastaCadena,null,null]
   */
  getService(filters =[null,null,null,null]):Observable<DataList<Service>>{
    // const filter = encodeURIComponent('{"idEmpleado":{"idPersona":1}}');

    const encodeUrl = encodeURIComponent(
      `{
        "fechaDesdeCadena":${filters[0] != null ? `"${filters[0]}"`:null},
        "fechaHastaCadena":${filters[1] != null ? `"${filters[1]}"`:null},
        "idFichaClinica":{"idCliente":{"idPersona":${filters[2]}}},
        "idEmpleado":{"idPersona":${filters[3]}}
      }`
      )
    
    
    return this.http.get<DataList<Service>>(`${environment.baseUrlApi}/${this.serviceUrl}?ejemplo=${encodeUrl}`)
  }
  
  storeService(idFichaClinica:number,observacion = null):Observable<Service>{
    //getting headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario':'usuario1'
    })
    //building body of the post request
    const body = {idFichaClinica:{idFichaClinica:idFichaClinica},observacion:observacion}
    
    return this.http.post<Service>(`${environment.baseUrlApi}/${this.serviceUrl}`,body,{headers:headers});
  }


}
