import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { NavController } from '@ionic/angular';
import { producto } from '../../../interfaces/producto';
import { categoria } from '../../../interfaces/categoria';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
Producto:producto={
  nombre:'',
  descripcion:'',
  imagen:'',
  precio:0,
  total:0,
  cantidad:0,
  categoria:'',
  estado:true
}
  constructor(private ruta: ActivatedRoute,
    private ProductosService:CrudProductosService,
    private navCtrl:NavController) { }
id='';
ngOnInit() {
this.id=this.ruta.snapshot.params.id;
this.cargarCatgoria(this.id);
}
async cargarCatgoria(id){
await this.ProductosService.getProducto(id).subscribe(res=>{
this.Producto = res;
}) ;
}
async editar(){

if(this.Producto.nombre!=='' && this.Producto.imagen!=='' && this.Producto.descripcion!==''
&& this.Producto.precio!=0 && this.Producto.categoria!=='' ){
this.ProductosService.updateProducto(this.Producto,this.id);
this.navCtrl.navigateForward('/admin/administracion')
}
}

}
