import {Injectable} from '@angular/core';
import {Reserva} from "../model/reserva.model";
import {DataList} from "../model/dataList";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  reservaUrl: string = 'reserva';

  constructor(private http: HttpClient) {
  }

  getAllReservas(itemsPerPage: number, inicio: number): Observable<DataList<Reserva>> {
    const url = `${this.reservaUrl}?inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idReserva&orderDir=asc`
    return this.http.get<DataList<Reserva>>(`${environment.baseUrlApi}/${url}`)
  }

  /**
   * @param filters
   * @returns DataList<Reserva>
   * the values of the filter should to have the next order (mandatory):
   *  [idEmpleado,fechaDesdeCadena,fechaHastaCadena,idCliente]
   *  if you don't have some of these values just sent null e.g [null,fechaHastaCadena,null,null]
   */
  getReserva(filters = [null, null, null, null], itemsPerPage: number, inicio: number): Observable<DataList<Reserva>> {
    // const filter = encodeURIComponent('{"idEmpleado":{"idPersona":1}}');
    const encodeUrl = encodeURIComponent(`{
        "idEmpleado":{"idPersona":${filters[0]}},
        "fechaDesdeCadena":${filters[1] != null ? `"${filters[1]}"` : null},
        "fechaHastaCadena":${filters[2] != null ? `"${filters[2]}"` : null},
        "idCliente":{"idPersona":${filters[3]}}
      }`)

    const page = `?inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idReserva&orderDir=asc`

    console.log('encodeUrl', encodeUrl);
    return this.http.get<DataList<Reserva>>(`${environment.baseUrlApi}/${this.reservaUrl}?ejemplo=${encodeUrl}`)
  }

  getUniqueReseva(id: String): Observable<Reserva> {
    return this.http.get<Reserva>(`${environment.baseUrlApi}/${this.reservaUrl}/${id}`)
  }

  deleteReserva(id: String): Observable<any> {
    return this.http.delete(`${environment.baseUrlApi}/${this.reservaUrl}/${id}`).pipe(tap({
      next: (data) => console.log('eliminado ' + data), error: (error) => console.log("error: " + error),
    }));
  }

  updateReserva(p: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1'
    });

    let options = {headers: headers};

    return this.http.put(`${environment.baseUrlApi}/${this.reservaUrl}`, p, options).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
    }));
  }
}
