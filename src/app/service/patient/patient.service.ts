import { Injectable } from '@angular/core';
import { DataList } from "../../model/dataList";
import { Patient } from "../../model/patient";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatientsList(): Observable<DataList<Patient>>{
    let direction = "/stock-nutrinatalia/persona?";
    return this.http.get<DataList<Patient>>(direction);
  }

}
