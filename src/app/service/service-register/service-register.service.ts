import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getService():Observable<DataList<Service>>{
    const filter = encodeURIComponent('{"idEmpleado":{"idPersona":1}}');
    console.log(`${environment.baseUrlApi}/${this.serviceUrl}?ejemplo=${filter}`);
    
    return this.http.get<DataList<Service>>(`${environment.baseUrlApi}/${this.serviceUrl}?ejemplo=${filter}`)
  }

}
