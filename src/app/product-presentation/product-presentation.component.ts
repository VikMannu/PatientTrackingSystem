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
  productS: ProductPresentation=new ProductPresentation();
  config: ConfigPage=new ConfigPage();
  message: string = "";
  formValue !: FormGroup;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private serviceProductPresentation: ProductPresentationService, private forbuilber: FormBuilder) { }

  ngOnInit(): void {
    this.formValue=this.forbuilber.group({
      nombre : [''],
      descripcion : [''],
      idProducto : ['']
    });
    this.config.currentPage=1;
    this.getProducts();
  }
  getProducts():void{
    let inicio= this.config.currentPage-1;
    inicio = inicio*this.config.itemsPerPage;
    this.serviceProductPresentation.getProducts(inicio).subscribe(
      entity => this.products = entity.lista,
      error => console.log('no se pudieron conseguir los productos')
    );
  }
  //boton a mostrar en el form de relleno
  clickAdd(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  saveProduct(): void{
    this.serviceProductPresentation.createProduct(this.productS).subscribe(
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
