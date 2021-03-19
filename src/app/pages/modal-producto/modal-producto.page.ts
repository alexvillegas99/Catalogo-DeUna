import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
})
export class ModalProductoPage implements OnInit {

  @Input() producto: producto;
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  total=0;
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }
 
  ngOnInit() {
    this.producto.total = (this.producto.cantidad=0) * this.producto.precio;
  }
  calcular(signo) {
    let valor = eval( this.producto.cantidad+ signo + 1)
    if (valor === 0) {
      this.producto.cantidad = 1;
    } else {
      this.producto.cantidad = valor;
    }
    this.producto.total  =  this.producto.cantidad * this.producto.precio;
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  continuarCompra(producto:producto){
    if(producto.cantidad!==0){
    this.dataLocal.guardarProducto(producto);
    }
    this.modalCtrl.dismiss(); 
  }

}
