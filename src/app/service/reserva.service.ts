import { Injectable } from '@angular/core';
import {Reserva} from "../model/reserva.model";
import {DataList} from "../model/dataList";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api: string = "/stock-nutrinatalia";

  constructor(private http: HttpClient){}

  getReservas(): Observable<DataList<Reserva>> {
    return this.http.get<DataList<Reserva>>(`${this.api}/reserva`);
  }

  agregarReserva(p: any): Observable<any> {
    return this.http.post(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('agregado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  borrarReserva(id: Number): Observable<any> {
    return this.http.delete(`${this.api}/reserva/${id}`).pipe(
      tap({
        next: (data) => console.log('eliminado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  actualizarReserva(p: any): Observable<any> {
    return this.http.put(`${this.api}/reserva`, p).pipe(
      tap({
        next: (data) => console.log('actualizado ' + data),
        error: (error) => console.log("error: " + error),
      })
    );
  }

  obtenerTodasHorasReservas(filtros:String[],idEmpelado:number,fecha:string,flagDisponible:string): Observable<Reserva[]> {

    if(filtros.includes('Disponible')){
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}&disponible=${flagDisponible}`)
    } else{
      return this.http.get<Reserva[]>
      (`${this.api}/persona/${idEmpelado}/agenda?fecha=${fecha}`)
    }
  }

}