import { Component, OnInit } from '@angular/core';
import { producto } from '../../../interfaces/producto';
import { categoria } from '../../../interfaces/categoria';
import { ActivatedRoute } from '@angular/router';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { NavController } from '@ionic/angular';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  Producto:producto={
    nombre:'',
    id:'',
    descripcion:'',
    imagen:'',
    precio:0,
    total:0,
    cantidad:0,
    categoria:'',
    estado:true
  }
  Categorias:categoria[]=[];
    constructor(private ruta: ActivatedRoute,
      private ProductosService:CrudProductosService,
      private navCtrl:NavController,
  private CategoriasService:CrudCategoriasService) { }
  id='';
  async cargarCategorias(){
    await this.CategoriasService.getCategorias().subscribe(res=>{
      this.Categorias = res;
    }) ;
   
  }
  ngOnInit() {
  this.cargarCategorias();
  }
 
  async agregar(){
  
  if(this.Producto.nombre!=='' && this.Producto.imagen!=='' && this.Producto.descripcion!==''
  && this.Producto.precio!=0 && this.Producto.categoria!=='' ){
  this.ProductosService.inserProducto(this.Producto);
  this.navCtrl.navigateForward('/admin/administracion')
  }
  }
  
}
