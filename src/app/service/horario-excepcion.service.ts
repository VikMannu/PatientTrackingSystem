import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataList} from "../model/dataList";
import {HorarioExcepcion} from "../model/horarioExcepcion";

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

}
