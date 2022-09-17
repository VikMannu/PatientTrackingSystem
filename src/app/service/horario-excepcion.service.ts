import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {DataList} from "../model/dataList";
import {HorarioExcepcion} from "../model/horarioExcepcion";
import {HorarioAtencion} from "../model/horarioAtencion";

@Injectable({
  providedIn: 'root'
})
export class HorarioExcepcionService {

  private api: string = "/stock-nutrinatalia/horarioExcepcion";

  constructor(private http: HttpClient) { }

  getExceptionSchedule(itemsPerPage: number, inicio: number, filters= [null, null]): Observable<DataList<HorarioExcepcion>> {
    const encode = encodeURIComponent(
      `{"fechaCadena":${filters[0] != null ? `"${filters[0]}"`:null},
        "idEmpleado":{"idPersona":${filters[1]}}}`
    );
    console.log('Query enviado: ' + encode);
    const url = `?ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idHorarioExcepcion&orderDir=asc`;
    return this.http.get<DataList<HorarioExcepcion>>(this.api+url);
  }


  updateExceptionalSchedule(h: HorarioExcepcion): Observable<HorarioExcepcion>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });
    let options = { headers: headers };
    return this.http.put<HorarioExcepcion>(this.api, h, options).pipe(
      tap({
        next: (data) => console.log(`updated id=${h.idHorarioExcepcion}`),
        error: (error) => console.log('error: ' + error)
      })
    );
  }


  createExceptionSchedule(h: any): Observable<HorarioExcepcion>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1' });
    let options = { headers: headers };
    return this.http.post<HorarioExcepcion>(this.api, h, options).pipe(
      tap({
        next: (data) => console.log(`creado id=${h.idHorarioExcepcion}`),
        error: (error) => console.log('error: ' + error)
      })
    );
  }

}
