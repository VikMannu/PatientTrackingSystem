import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../../service/patient/patient.service";
import { Patient } from "../../../model/patient";


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent implements OnInit {


  patients: Patient[] = [];
  totalPatients: number = 0;


  constructor(private api:PatientService) { }

  ngOnInit(): void {
    this.api.getPatientsList(30).subscribe(data => {
        this.patients = data.lista;
        this.totalPatients = data.totalDatos;
      }
    )

  }

}
