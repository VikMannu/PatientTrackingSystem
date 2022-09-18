import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Reserva} from "../model/reserva.model";
import {environment} from "../../environments/environment";
import {DataList} from "../model/dataList";

@Injectable({
  providedIn: 'root'
})
export class CrearReservaService {
  reservaUrl: string = 'reserva';

  constructor(private http: HttpClient) { }

  getAllHoursReservas(filters: String[]): Observable<Reserva[]> {
    const aux = "%3Ffecha%3D20190903%26disponible%3DS"
    return this.http.get<Reserva[]>(`stock-nutrinatalia/persona/${filters[1]}/agenda?fecha=${filters[0]}&disponible=S`)
  }

  addReserva(p: Reserva): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'usuario': 'usuario1'
    });

    console.log(`${environment.baseUrlApi}/${this.reservaUrl}`)
    console.log(p)

    let options = {headers: headers};

    return this.http.post(`${environment.baseUrlApi}/${this.reservaUrl}`, p, options).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error)
    }));
  }
}
