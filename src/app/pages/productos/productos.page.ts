import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { Subscription } from 'rxjs';
import { producto } from '../../interfaces/producto';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../modal-producto/modal-producto.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit, OnDestroy {
  sucriptionProductos: Subscription = new Subscription(); 
  productos:producto[]=[];
  constructor(private crudService:CrudProductosService,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    this.sucriptionProductos = this.crudService.getProductos().subscribe(res => {
      this.productos = res;
      this.productos = this.productos.filter(prod=>
      prod.estado===true
      )
    });
  }
  ngOnDestroy():void{
    this.sucriptionProductos.unsubscribe();
  }
  async mostrarModal(producto:producto) {
    const modal = await this.modalCtrl.create({
      component: ModalProductoPage, 
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }

}
