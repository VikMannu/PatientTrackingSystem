import { Subcategory } from "./subcategory";

export class Product {
  idProducto!: number;
  descripcion!: string;
  idTipoProducto= new Subcategory();
}
