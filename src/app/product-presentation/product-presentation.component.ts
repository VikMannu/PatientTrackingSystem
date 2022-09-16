import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigPage } from '../model/configPage';
import { ProductPresentation } from '../model/productPresentation';
import { ProductPresentationService } from '../service/product-presentation.service';

@Component({
  selector: 'app-product-presentation',
  templateUrl: './product-presentation.component.html',
  styleUrls: ['./product-presentation.component.css']
})
export class ProductPresentationComponent implements OnInit {
  products: ProductPresentation[]=[];
  product: ProductPresentation=new ProductPresentation();
  config: ConfigPage=new ConfigPage();
  message: string = "";
  formValue !: FormGroup;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private serviceProductPresentation: ProductPresentationService, private forbuilber: FormBuilder) { }

  ngOnInit(): void {
    this.formValue=this.forbuilber.group({
      nombre : [''],
      idProducto : [''],
      filterNameInput : null,
      filterIdInput : null
    });
    this.config.currentPage=1;
    this.getProducts();
  }
  //funcion para obtener los valores de los filtros
  getFilter(){
    return[
      this.formValue.get('filterIdInput')?.value ?? null,
      this.formValue.get('filterNameInput')?.value ?? null
    ];
  }
  getProducts():void{
    let inicio= this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    const filters=this.getFilter();
    console.log(filters);

    this.serviceProductPresentation.getProducts(filters,this.config.itemsPerPage,inicio).subscribe(
      entity => this.products = entity.lista,
      error => console.log('no se pudieron conseguir los productos',error)
    );
  }
  //funcion para paginar
  filtrar(){
    this.config.currentPage=1;
    this.getProducts();
  }
  //boton a mostrar en el form de relleno
  clickAdd(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  //funcion para filtrar por id o descripcion
  cleanFilters():void {
    this.config.currentPage=1;
    this.formValue.reset();
    this.getProducts();
  }
  saveProduct(): void{
    this.product.codigo=this.products[this.products.length - 1].codigo + 1;
    this.product.nombre=this.formValue.value.nombre;
    this.product.idProducto.idProducto=this.formValue.value.idProducto;
    console.log(this.product);
    this.serviceProductPresentation.createProduct(this.product).subscribe(
      () => {
        this.message='Agregado exitosamente'
        let ref=document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getProducts();
      },
      error => console.log("error: "+error)
    );
  }
  changePage(page: number){
    this.config.currentPage=page;
    this.getProducts();
  }
}
