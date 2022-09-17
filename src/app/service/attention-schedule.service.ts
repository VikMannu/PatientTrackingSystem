import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HorarioAtencion} from "../model/horarioAtencion";
import {Observable, tap} from "rxjs";
import {DataList} from "../model/dataList";

@Injectable({
  providedIn: 'root'
})
export class AttentionScheduleService {

  private api: string = "/stock-nutrinatalia/personaHorarioAgenda";

  constructor(private http: HttpClient) { }

  getAttentionSchedule(itemsPerPage: number, inicio: number): Observable<DataList<HorarioAtencion>> {
    const url = `?inicio=${inicio}&cantidad=${itemsPerPage}`;
    return this.http.get<DataList<HorarioAtencion>>(this.api+url);
  }

  createSchedule(h: HorarioAtencion): Observable<HorarioAtencion>{
    return this.http.post<HorarioAtencion>(this.api, h).pipe(
      tap({
        next: (data) => console.log(`creado id=${h.idPersonaHorarioAgenda}`),
        error: (error) => console.log('error: ' + error)
      })
    );
  }

  getFilterAttentionSchedule(
    itemsPerPage: number,
    inicio: number,
    filter = [null, null]
  ): Observable<DataList<HorarioAtencion>> {
    const encode = encodeURIComponent(
      `{
        "idEmpleado":{"idPersona": ${filter[0] != null ? `"${filter[0]}"` : null}},
        "dia": ${filter[1] != null ? `"${filter[1]}"` : null}
      }`
    );
    console.log('Query enviado: ' + encode);
    const url = `?ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}`;
    return this.http.get<DataList<HorarioAtencion>>(this.api+url);
  }

  updateSchedule(h: HorarioAtencion): Observable<HorarioAtencion>{
    return this.http.put<HorarioAtencion>(this.api, h).pipe(
      tap({
        next: (data) => console.log(`updated id=${h.idPersonaHorarioAgenda}`),
        error: (error) => console.log('error: ' + error)
      })
    );
  }

  deleteSchedule(idSchedule: number): Observable<any>{
    const url = `${this.api}/${idSchedule}`;
    return this.http.delete(url).pipe(
      tap({
        next: (data) => console.log(`deleted id=${idSchedule}`),
        error: (error) => console.log('error: ' + error)
      })
    )
  }

}
