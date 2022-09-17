import { Product } from "./product";

export class ProductPresentation {
  idPresentacionProducto!: number;
  codigo!:number;
  nombre!: string
  tamanho!:number;
  descripcion!: string;
  flagServicio!: string;
  idProducto= new Product();
  existenciaProducto!: any
}
