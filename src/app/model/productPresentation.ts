import { Product } from "./product";

export class ProductPresentation {
  idPresentacionProducto!: number;
  codigo!:number;
  flagServicio!: string;
  idProducto= new Product();
  nombre!: string
  existenciaProducto!: any
  tamanho!:number;
  descripcion!: string;
}
