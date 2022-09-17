import {Person} from "./person";

export class HorarioAtencion {
  idPersonaHorarioAgenda!: number;
  dia!: string;
  horaAperturaCadena!: string;
  horaCierreCadena!: string;
  intervaloMinutos!: string;
  idEmpleado = new Person();
}
