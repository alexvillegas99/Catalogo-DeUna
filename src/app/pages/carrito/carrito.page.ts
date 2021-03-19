import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { FinalizarPage } from '../finalizar/finalizar.page';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productos: producto[] = [];
  constructor(private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private navCtrl:NavController) { }
  total = 0;
  ngOnInit() {
    this.cargarProductos();
    
  }
  async calculaTotal(){
    this.productos = await this.dataLocal.getProductos();
    this.productos.forEach(producto => {
      this.total += producto.total;
    })
  }
  async cargarProductos() {
    this.total=0;
    this.productos = await this.dataLocal.getProductos();
    this.productos.forEach(producto => {
      this.total += producto.total;
    })
  }
  salir() {
    this.modalCtrl.dismiss();

  }
  async mostarModal() {   
    const modal = await this.modalCtrl.create({
      component: FinalizarPage
    });
    return await modal.present();
  }
  async editar(producto: producto) {
    const modal = await this.modalCtrl.create({
      component: EditarPage,
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
  async eliminar(producto:producto){
await this.dataLocal.delete(producto);
this.cargarProductos();
  }

}
