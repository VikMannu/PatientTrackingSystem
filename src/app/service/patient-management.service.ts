import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {DataList} from "../model/dataList";
import {Person} from "../model/person";

@Injectable({
  providedIn: 'root'
})
export class PatientManagementService {

  private api: string = "/stock-nutrinatalia/persona";

  constructor(private http: HttpClient) {
  }

  getPatients(itemsPerPage: number, inicio: number): Observable<DataList<Person>> {

    const url = `?inicio=${inicio}&cantidad=${itemsPerPage}&orderBy=idPersona&orderDir=desc`;

    return this.http.get<DataList<Person>>(this.api+url);
  }

  createPatient(p: Person): Observable<Person> {
    return this.http.post<Person>(this.api, p).pipe(
      tap(
        (data) => console.log('agregado '+ data),
        (error) => console.log('error: ' + error)
      )
    );
  }

  updatePatient(p: Person): Observable<Person>{
    return this.http.put<Person>(this.api, p).pipe(
      tap(
        (data) => console.log(`actualizado id=${p.idPersona}`),
        (error) => console.log('error: ' + error)
      )
    );
  }

  deletePatient(idPatient: string): Observable<Person> {
    const url = `${this.api}/${idPatient}`;
    return this.http.delete<Person>(url).pipe(
      tap(
        (data) => console.log(`Eliminado id=${idPatient}`),
        (error) => console.log('error: ' + error)
      )
    )
  }

}
