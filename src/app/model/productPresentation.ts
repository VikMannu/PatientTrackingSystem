import { Product } from "./product";

export class PresentationProducto {
  idPresentacionProducto!: number;
  nombre!: string;
  descripcion!: string;
  idProducto= new Product();
}
