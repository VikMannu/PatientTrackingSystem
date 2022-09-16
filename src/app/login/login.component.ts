import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogStatus } from '../model/logStatus';
import { Person } from '../model/person';
import { PatientManagementService } from '../service/patient-management.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLog: LogStatus = new LogStatus();
  formValue!: FormGroup;
  constructor(
    private personService: PatientManagementService,
    private formbuilber: FormBuilder,
    private router : Router
  ) {}
  users: Person[] = [];
  message: string = '';

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      user: [''],
      pass: [''],
    });
    this.getUsers();
  }
  //funcion para obtener los usuarios
  getUsers() {
    this.personService.getUsers().subscribe(
      (entity) => (this.users = entity.lista),
      (error) => console.log('no se pudieron conseguir los usuarios')
    );
  }
  //funcion para loguear al usuario
  public verifyLogin(): void {
    this.userLog.statusLogin=false;
    const name = this.formValue.value.user;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].nombre == name) {
        this.userLog.user = this.users[i].nombre;
        this.userLog.statusLogin = true;
        this.message = 'Bienvenido ' + this.userLog.user;
        this.router.navigateByUrl('menu');
        break;
      }
    }
    if (!this.userLog.statusLogin) {
      this.message = 'El usuario no existe';
    }
  }
}
