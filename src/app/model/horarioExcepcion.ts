import {Person} from "./person";

export class HorarioExcepcion {
  idHorarioExcepcion!:number
  fechaCadena!: string
  horaAperturaCadena!: string
  horaCierreCadena!: string
  flagEsHabilitar!: string
  idEmpleado = new Person()
  intervaloMinutos!: string
}
