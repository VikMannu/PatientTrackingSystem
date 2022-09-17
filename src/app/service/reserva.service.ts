import {Injectable} from '@angular/core';
import {Reserva} from "../model/reserva.model";
import {DataList} from "../model/dataList";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Person} from "../model/person";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api: string = "/stock-nutrinatalia/";

  constructor(private http: HttpClient) {
  }

  getReservas(itemsPerPage: number, inicio: number): Observable<DataList<Reserva>> {
    const url = `reserva?inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idReserva&orderDir=asc`;
    return this.http.get<DataList<Reserva>>(`${this.api}${url}`);
  }

  getFilterReservas(
    itemsPerPage: number,
    inicio: number,
    filter = [null, null, null, null]
  ): Observable<DataList<Person>> {
    const encode = encodeURIComponent(
      `{
        "idEmpleado":{"idPersona": ${filter[0] != null ? `"${filter[0]}"` : null}},
        "apellido": ${filter[1] != null ? `"${filter[1]}"` : null},
        "soloUsuariosDelSistema": ${filter[2] != null ? `"${filter[2]}"` : null}
      }`
    );
    console.log('Query enviado: ' + encode);
    const url = `?like=S&ejemplo=${encode}&inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idPersona&orderDir=asc`;
    return this.http.get<DataList<Person>>(this.api+url);

  }

  addReserva(p: any): Observable<any> {
    return this.http.post(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  deleteReserva(id: Number): Observable<any> {
    return this.http.delete(`${this.api}/reserva/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  updaterReserva(p: any): Observable<any> {
    return this.http.put(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  getAllHoursReservas(filters: String[], idEmpleado: number, fecha: string, flagDisponible: string): Observable<Reserva[]> {

    if (filters.includes('Disponible')) {
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpleado}/agenda?fecha=${fecha}&disponible=${flagDisponible}`)
    } else {
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpleado}/agenda?fecha=${fecha}`)
    }
  }

}
