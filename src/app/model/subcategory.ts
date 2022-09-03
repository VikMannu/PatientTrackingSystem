import { Category } from "./category";

export class Subcategory {
  idTipoProducto!: number;
  descripcion!: string;
  idCategoria: Category =new Category;
}
