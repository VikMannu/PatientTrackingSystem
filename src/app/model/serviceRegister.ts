import { FichaClinica } from './fichaClinica';
export class Service {
    idServicio!: number;  
    fechaHora!: Date;
    idFichaClinica = new FichaClinica();
}