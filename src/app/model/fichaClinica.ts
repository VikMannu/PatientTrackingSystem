import { ProductPresentation } from './productPresentation';
import { Subcategory } from './subcategory';
import { Person } from './person';
export class FichaClinica {
    idFichaClinica!: number;  
    fechaHora!: Date;
    motivoConsulta!: string;
    diagnostico!: string;
    observacion!: string;
    idTipoProducto = new Subcategory();
    idCliente = new Person();
    idEmpleado = new Person();
}