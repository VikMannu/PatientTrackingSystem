export class Reserva {
  idReserva!: String
  fechaCadena!: String
  horaInicioCadena!: String
  horaFinCadena!: String
  idEmpleado!: {
    idPersona: String
    nombre: String
    apellido: String
  }
  idCliente!: {
    idPersona: String
    nombre: String
    apellido: String
  }
  observacion!: String
  flagAsistio!: String
}
